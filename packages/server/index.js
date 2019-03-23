const fastify = require('fastify')({
	logger: {
		level: 'info',
		prettyPrint: true,
	},
})
const swagger = require('./swagger')

fastify.register(require('fastify-swagger'), swagger.options)

fastify.register(require('fastify-mongodb'), {
	forceClose: true,
	useNewUrlParser: true,
	url: 'mongodb://kanban:kanban-app@localhost:27017/kanban-app?authSource=kanban-app',
})

fastify.register(require('./routes/routes'))

const start = async () => {
	try {
		await fastify.listen(5000)
		fastify.swagger()
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
