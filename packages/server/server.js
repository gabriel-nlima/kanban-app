const sharedId = require('./schemas/id')
const { sharedTask } = require('./schemas/task')
const { sharedProject } = require('./schemas/project')

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

	fastify.register(require('fastify-mongodb'), {
		forceClose: true,
		useNewUrlParser: true,
		url:
			'mongodb://kanban:kanban-app@localhost:27017/kanban-app?authSource=kanban-app',
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

	fastify.register(async (fastify, opts, next) => {
		await sharedId(fastify)
		await sharedTask(fastify)
		await sharedProject(fastify)
		require('./routes/tasks')(fastify)
		require('./routes/projects')(fastify)
		next()
	})

	return fastify
}

module.exports = server
