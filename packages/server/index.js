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

fastify.register(require('fastify-static'), {
	root: path.join(__dirname, 'build'),
})

fastify.get('/', function(req, reply) {
	reply.sendFile('index.html')
})

fastify.register(require('./routes/routes'))

const start = async () => {
	try {
		await fastify.listen({ port: 5000, host: 'localhost' })
		fastify.swagger()
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
