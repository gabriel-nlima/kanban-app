const {
	addProject,
	getProjects,
	getProjectTasks,
	updateProject,
	deleteProject,
} = require('../schemas/project')

async function routes(fastify) {
	fastify.get('/api/projects', getProjects, function get(req, reply) {
		async function getProjects(err, col) {
			const projects = []
			await col
				.find(!req.query.status ? {} : { status: req.query.status })
				.forEach(function(project) {
					if (project) {
						projects.unshift(project)
					} else return false
				})

			reply.send({ projects })
		}
		const { db } = this.mongo
		db.collection('projects', getProjects)
	})

	fastify.get('/api/projects/:id', getProjectTasks, function get(req, reply) {
		async function getProjectTasks(err, col) {
			if (err) reply.send(err)
			const { id } = req.params
			const { ObjectId } = fastify.mongo
			const tasks = []
			await col
				.find({ project_id: ObjectId(id) })
				.forEach(function(task) {
					if (task) {
						tasks.unshift(task)
					} else return false
				})

			reply.send({ tasks })
		}
		const { db } = this.mongo
		db.collection('tasks', getProjectTasks)
	})

	fastify.post('/api/projects', addProject, function insert(req, reply) {
		function addProject(err, col) {
			if (err) reply.send(err)
			col.insertOne(req.body, (error, result) => {
				if (error) reply.send(error)
				const project = result.ops[0]
				reply.send({ project })
			})
		}
		const { db } = this.mongo
		db.collection('projects', addProject)
	})

	fastify.put('/api/projects/:id', updateProject, function edit(req, reply) {
		function updateProject(err, col) {
			if (err) reply.send(err)
			const { id } = req.params
			const { _id, ...project } = req.body
			const { ObjectId } = fastify.mongo

			col.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: project },
				{ returnOriginal: false },
				(error, result) => {
					if (error) reply.send(error)
					reply.send({ project: result.value })
				}
			)
		}
		const { db } = this.mongo
		db.collection('projects', updateProject)
	})

	fastify.delete('/api/projects/:id', deleteProject, function del(
		req,
		reply
	) {
		function deleteProject(err, col) {
			const { ObjectId } = fastify.mongo
			col.findOneAndDelete({ _id: ObjectId(req.params.id) })
			reply.send()
		}
		const { db } = this.mongo
		db.collection('projects', deleteProject)
	})
}

module.exports = routes
