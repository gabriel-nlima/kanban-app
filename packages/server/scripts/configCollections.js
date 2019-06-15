const { MongoClient } = require('mongodb')
require('dotenv').config()

const { MONGO_HOST, MONGO_USER, MONGO_PWD } = process.env
const mongoUrl = `mongodb://${
	MONGO_USER && MONGO_PWD
		? MONGO_HOST
			? `${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}`
			: `${MONGO_USER}:${MONGO_PWD}@localhost:27017`
		: ''
}/kanban-app?authSource=kanban-app`

/**
 * Creates indexes in the dabatase collections. TODO: create schemas validations
 */
const configCollections = async () => {
	try {
		const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true })
		await mongoClient.connect()
		const db = mongoClient.db()

		const users = db.collection('users')
		const projects = db.collection('projects')
		const tasks = db.collection('tasks')

		await users.createIndex(
			{ email: 1 },
			{ background: true, unique: true }
		)
		await projects.createIndex(
			{ name: 'text', desc: 'text', tag1: 'text', tag2: 'text' },
			{ background: true }
		)
		await tasks.createIndex(
			{ title: 'text', desc: 'text', tag1: 'text', tag2: 'text' },
			{ background: true }
		)
		await tasks.createIndex({ project_id: 1 }, { background: true })
		console.log('Done.')
		mongoClient.close()
		process.exit(0)
	} catch (err) {
		console.log(err)
		mongoClient.close()
		process.exit(0)
	}
}

if (
	!process.env.MONGO_USER ||
	!process.env.MONGO_PWD ||
	!process.env.MONGO_HOST
) {
	console.log(
		'Adicione o usuário ou senha ou uri do mongodb no seu arquivo arquivo .env'
	)
	process.exit(0)
} else {
	configCollections()
}
