const fastify = require('fastify')({
	logger: {
		level: 'info',
		prettyPrint: true,
	},
})
const swagger = require('./swagger')

fastify.register(require('fastify-swagger'), swagger.options)
fastify.register(require('./schemas/tarefasSchema'))

fastify.register(require('fastify-mongodb'), {
	forceClose: true,
	useNewUrlParser: true,
	url: 'mongodb://localhost:27017/backend-tarefas',
})

fastify.register(require('./routes/routes'))

const start = async () => {
	try {
		await fastify.listen(5000)
		fastify.swagger()
		fastify.log.info(`listening on ${fastify.server.address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
