const sharedSchema = require('../schemas/taskSchema')
const schemas = require('../schemas/responses')

async function routes(fastify) {
	sharedSchema(fastify)

	fastify.get('/api/tasks', schemas.getTasks, function get(req, reply) {
		async function getTasks(err, col) {
			const tasks = []
			await col.find({}).forEach(function(task) {
				if (task) {
					tasks.unshift(task)
				} else {
					return false
				}
			})

			reply.send({ tasks })
		}
		const { db } = this.mongo
		db.collection('tasks', getTasks)
	})

	fastify.post('/api/tasks', schemas.addTask, function insert(req, reply) {
		function addTask(err, col) {
			if (err) reply.send(err)
			col.insertOne(req.body, (error, result) => {
				if (error) reply.send(error)
				const task = result.ops[0]
				reply.send({ task })
			})
		}
		const { db } = this.mongo
		db.collection('tasks', addTask)
	})

	fastify.put('/api/tasks/:id', schemas.updateTask, function edit(
		req,
		reply
	) {
		function updateTask(err, col) {
			const { id } = req.params
			const { _id, ...task } = req.body
			const { ObjectId } = fastify.mongo

			console.log(task)
			col.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: task },
				{ returnOriginal: false },
				(erro, result) => {
					reply.send({ task: result.value })
				}
			)
		}
		const { db } = this.mongo
		db.collection('tasks', updateTask)
	})

	fastify.delete('/api/tasks/:id', schemas.deleteTask, function del(
		req,
		reply
	) {
		function deleteTask(err, col) {
			const { ObjectId } = fastify.mongo
			col.findOneAndDelete({ _id: ObjectId(req.params.id) })
			reply.send()
		}
		const { db } = this.mongo
		db.collection('tasks', deleteTask)
	})
}

module.exports = routes
