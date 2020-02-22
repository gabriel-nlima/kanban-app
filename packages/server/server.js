require('dotenv').config()
const fastify = require('fastify')({
	logger: {
		level: 'info',
		prettyPrint: true,
	},
})
const path = require('path')
const helmet = require('fastify-helmet')

// schemas
const idSchema = require('./schemas/id')
const { sharedTask } = require('./schemas/task')
const { sharedProject } = require('./schemas/project')
const { userSchema, loginUserSchema } = require('./schemas/user')

// utils
const {
	hashPassword,
	validatePassword,
	addUser,
	verifyToken,
} = require('./userUtils')

const swagger = require('./swagger')

function server() {
	fastify.log.info('////// Loading plugins //////')
	fastify.register(helmet, {
		hidePoweredBy: { setTo: '' },
		permittedCrossDomainPolicies: { permittedPolicies: 'none' },
		referrerPolicy: { policy: 'no-referrer' },
	})

	fastify.register(require('fastify-swagger'), swagger.options)

	const { MONGO_HOST, MONGO_USER, MONGO_PWD, SECRET } = process.env
	if (!MONGO_HOST || !MONGO_USER || !MONGO_PWD || !SECRET) {
		fastify.log.warn(
			'////// Missing secret or credentials (MONGO_HOST, MONGO_USER, MONGO_PWD) for DB, create a .env file with then. //////'
		)
	}
	const mongoUrl = `mongodb://${
		MONGO_USER && MONGO_PWD
			? MONGO_HOST
				? `${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}/`
				: `${MONGO_USER}:${MONGO_PWD}@localhost:27017/`
			: 'localhost:27017/'
	}kanban-app?authSource=kanban-app`

	fastify
		.register(require('fastify-mongodb'), {
			forceClose: true,
			useNewUrlParser: true,
			url: mongoUrl,
			useUnifiedTopology: true,
		})
		.after((err) => {
			if (err) {
				fastify.log.error('////// Failed to connect to database //////')
				throw err
			}
			fastify.log.info('////// Database connected successfully //////')
		})

	if (process.env.NODE_ENV === 'production') {
		fastify.register(require('fastify-static'), {
			root: path.join(__dirname, 'build'),
		})

		fastify.get('/', function(req, reply) {
			reply.sendFile('index.html')
		})
	}

	fastify.register(require('fastify-jwt'), {
		secret: SECRET || 'verysupersecretK4NB4N',
	})

	// global schemas
	fastify.addSchema(idSchema)
	fastify.addSchema(loginUserSchema)
	fastify.addSchema(userSchema)

	// user decorators
	fastify.decorate('hashPassword', hashPassword)
	fastify.decorate('validatePassword', validatePassword)
	fastify.decorate('addUser', addUser)

	// login and register user routes
	fastify.register(require('./routes/login')).after((err) => {
		if (err) {
			fastify.log.error('////// Failed to load Login route //////')
			throw err
		}
		fastify.log.info('////// Login route loaded successfully //////')
	})
	fastify.register(require('./routes/registerUser')).after((err) => {
		if (err) {
			fastify.log.error('////// Failed to load Register route //////')
			throw err
		}
		fastify.log.info('////// Register route loaded successfully //////')
	})

	fastify.register(async (instance, opts, next) => {
		// shared schemas
		await sharedTask(instance)
		await sharedProject(instance)

		instance.addHook('onRequest', (req, reply, done) => {
			verifyToken(req, reply, done, instance)
		})

		//routes
		instance.log.info('////// Loading secured routes... //////')
		instance.register(require('./routes/tasks')).after((err) => {
			if (err) {
				instance.log.error('////// Failed to load tasks routes //////')
				throw err
			}
			instance.log.info('////// Tasks routes loaded successfully //////')
		})
		instance.register(require('./routes/projects')).after((err) => {
			if (err) {
				instance.log.error(
					'////// Failed to load projects routes //////'
				)
				throw err
			}
			instance.log.info(
				'////// Projects routes loaded successfully //////'
			)
		})
		instance.register(require('./routes/users')).after((err) => {
			if (err) {
				instance.log.error('////// Failed to load users routes //////')
				throw err
			}
			instance.log.info('////// Users routes loaded successfully //////')
		})
		next()
	})

	return fastify
}

module.exports = server
