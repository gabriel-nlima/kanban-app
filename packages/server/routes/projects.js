const {
	addProject,
	getProjects,
	setActiveProject,
	updateProject,
	deleteProject,
} = require('../schemas/project')

async function routes(fastify) {
	fastify.get('/api/projects', getProjects, function get(req, reply) {
		async function getProjects(err, col) {
			const projects = []
			await col
				.aggregate([
					{
						$lookup: {
							from: 'tasks',
							localField: '_id',
							foreignField: 'project_id',
							as: 'tasks',
						},
					},
				])
				.forEach(function(project) {
					if (project) projects.push(project)
					else return false
				})

			reply.send({ projects })
		}
		const { db } = this.mongo
		db.collection('projects', getProjects)
	})

	fastify.get('/api/projects/:id', setActiveProject, function get(
		req,
		reply
	) {
		async function getProjects(err, col) {
			let activeProject = {}
			const { id } = req.params
			const { ObjectId } = fastify.mongo
			await col
				.aggregate([
					{
						$match: {
							_id: new ObjectId(id),
						},
					},
					{
						$lookup: {
							from: 'tasks',
							localField: '_id',
							foreignField: 'project_id',
							as: 'tasks',
						},
					},
				])
				.forEach(function(project) {
					if (project) activeProject = project
					else return false
				})

			reply.send({ activeProject })
		}
		const { db } = this.mongo
		db.collection('projects', getProjects)
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
