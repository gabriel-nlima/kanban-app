const { ObjectId } = require('mongodb')
const schemas = require('../schemas/responses')

async function routes(fastify) {
	fastify.get('/tarefas', schemas.getTarefas, function get(req, reply) {
		async function getTarefas(err, col) {
			const tarefas = []
			await col.find({}).forEach(function(tarefa) {
				if (tarefa) {
					tarefas.unshift(tarefa)
				} else {
					return false
				}
			})

			reply.send({ tarefas })
		}
		const { db } = this.mongo
		db.collection('tarefas', getTarefas)
	})

	fastify.post('/tarefas', schemas.addTarefa, function insert(req, reply) {
		function addTarefa(err, col) {
			if (err) reply.send(err)
			col.insertOne(req.body, (error, result) => {
				if (error) reply.send(error)
				const tarefa = result.ops[0]
				reply.send({ tarefa })
			})
		}
		const { db } = this.mongo
		db.collection('tarefas', addTarefa)
	})

	fastify.put('/tarefas/:id', schemas.updateTarefa, function edit(
		req,
		reply
	) {
		function updateTarefa(err, col) {
			const { id } = req.params
			const { _id, ...tarefa } = req.body

			col.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: tarefa },
				{ returnOriginal: false },
				(erro, result) => {
					reply.send({ tarefa: result.value })
				}
			)
		}
		const { db } = this.mongo
		db.collection('tarefas', updateTarefa)
	})

	fastify.delete('/tarefas/:id', schemas.deleteTarefa, function del(
		req,
		reply
	) {
		function deleteTarefa(err, col) {
			col.findOneAndDelete({ _id: ObjectId(req.params.id) })
			reply.send()
		}
		const { db } = this.mongo
		db.collection('tarefas', deleteTarefa)
	})
}

module.exports = routes
