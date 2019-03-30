const server = require('./server')

const start = async () => {
	const fastify = await server()
	try {
		await fastify.listen({ port: 5000, host: 'localhost' })
		fastify.swagger()
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
