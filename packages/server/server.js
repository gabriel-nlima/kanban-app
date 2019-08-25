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
const { userSchema } = require('./schemas/user')

// utils
const {
	hashPassword,
	validatePassword,
	addUser,
	verifyToken,
} = require('./userUtils')

const swagger = require('./swagger')

function server() {
	fastify.register(helmet, {
		hidePoweredBy: { setTo: '' },
		permittedCrossDomainPolicies: { permittedPolicies: 'none' },
		referrerPolicy: { policy: 'no-referrer' },
	})

	fastify.register(require('fastify-swagger'), swagger.options)

	const { MONGO_HOST, MONGO_USER, MONGO_PWD, SECRET } = process.env
	const mongoUrl = `mongodb://${
		MONGO_USER && MONGO_PWD
			? MONGO_HOST
				? `${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}`
				: `${MONGO_USER}:${MONGO_PWD}@localhost:27017`
			: ''
	}/kanban-app?authSource=kanban-app`

	fastify.register(require('fastify-mongodb'), {
		forceClose: true,
		useNewUrlParser: true,
		url: mongoUrl,
	})

	fastify.register(require('fastify-compress'))

	if (process.env.NODE_ENV === 'production') {
		fastify.register(require('fastify-static'), {
			root: path.join(__dirname, 'build'),
		})

		fastify.get('/', function(req, reply) {
			reply.sendFile('index.html')
		})
	}

	fastify.register(require('fastify-jwt'), {
		secret: SECRET || 'very super secret',
	})

	// global schemas
	fastify.addSchema(idSchema)
	fastify.addSchema(userSchema)

	// user decorators
	fastify.decorate('hashPassword', hashPassword)
	fastify.decorate('validatePassword', validatePassword)
	fastify.decorate('addUser', addUser)

	// login and register user routes
	fastify.register(require('./routes/login'))
	fastify.register(require('./routes/registerUser'))

	// protected routes [TODO]
	fastify.register(async (instance, opts, next) => {
		// shared schemas
		await sharedTask(instance)
		await sharedProject(instance)

		// instance.addHook('onRequest', verifyToken)

		//routes
		require('./routes/tasks')(instance)
		require('./routes/projects')(instance)
		require('./routes/users')(instance)
		next()
	})

	return fastify
}

module.exports = server
