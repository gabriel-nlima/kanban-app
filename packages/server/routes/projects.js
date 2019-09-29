const {
	addProject,
	getProjects,
	setActiveProject,
	updateProject,
	deleteProject,
} = require('../schemas/project')

const { queryProjects, queryProjectsTasks } = require('../utils')

async function routes(fastify) {
	const { ObjectId, db } = fastify.mongo
	fastify.get('/api/projects', getProjects, function get(req, reply) {
		async function getProjects(err, col) {
			const projects = []
			await col.aggregate(queryProjects).forEach(function(project) {
				if (project) projects.push(project)
				else return false
			})

			reply.send({ projects })
		}
		db.collection('projects', getProjects)
	})

	fastify.get('/api/projects/:id', setActiveProject, function get(
		req,
		reply
	) {
		async function getProject(err, col) {
			let activeProject = {}
			const { id } = req.params
			await col
				.aggregate(queryProjectsTasks(new ObjectId(id)))
				.forEach(function(project) {
					if (project) activeProject = project
					else return false
				})

			reply.send({ activeProject })
		}
		db.collection('projects', getProject)
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
		db.collection('projects', addProject)
	})

	fastify.put('/api/projects/:id', updateProject, function edit(req, reply) {
		function updateProject(err, col) {
			if (err) reply.send(err)
			const { id } = req.params
			const { _id, ...project } = req.body

			col.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: project },
				{ returnOriginal: false },
				(error, result) => {
					if (error) reply.send(error)
					reply.send({ project: result.value })
				}
			)
		}
		db.collection('projects', updateProject)
	})

	fastify.delete('/api/projects/:id', deleteProject, function del(
		req,
		reply
	) {
		const { id } = req.params
		function deleteProject(err, col) {
			col.findOneAndDelete({ _id: new ObjectId(id) })
			reply.send()
		}
		function deleteProjectTasks(err, col) {
			col.deleteMany({ project_id: new ObjectId(id) })
		}
		db.collection('tasks', deleteProjectTasks)
		db.collection('projects', deleteProject)
	})
}

module.exports = routes
