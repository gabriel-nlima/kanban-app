const sharedId = require('./schemas/id')
const { sharedTask } = require('./schemas/task')
const { sharedProject } = require('./schemas/project')
const { sharedUser } = require('./schemas/user')
require('dotenv').config()

function server() {
	const fastify = require('fastify')({
		logger: {
			level: 'info',
			prettyPrint: true,
		},
	})
	const path = require('path')
	const helmet = require('fastify-helmet')
	const swagger = require('./swagger')

	fastify.register(helmet, {
		hidePoweredBy: { setTo: '' },
		permittedCrossDomainPolicies: { permittedPolicies: 'none' },
		referrerPolicy: { policy: 'no-referrer' },
	})

	fastify.register(require('fastify-swagger'), swagger.options)
	const { MONGO_HOST, MONGO_USER, MONGO_PWD } = process.env
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

	fastify.register(async (instance, opts, next) => {
		// shared schemas
		await sharedId(instance)
		await sharedTask(instance)
		await sharedProject(instance)
		await sharedUser(instance)

		//routes
		require('./routes/tasks')(instance)
		require('./routes/projects')(instance)
		require('./routes/users')(instance)
		next()
	})

	return fastify
}

module.exports = server
