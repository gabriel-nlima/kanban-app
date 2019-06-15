const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongoUri = process.env.MONGO_URI
const mongoUser = process.env.MONGO_USER
const mongoPwd = process.env.MONGO_PWD

/**
 * Adiciona um usuário com permissão de leitura e escrita no servidor especificado em MONGO_URI (.env)
 */
async function addDbUser() {
	try {
		const mongoClient = new MongoClient(mongoUri, {
			useNewUrlParser: true,
		})
		await mongoClient.connect()
		const db = mongoClient.db()

		await db.command({ usersInfo: 1 }).then(async (res) => {
			const { users } = res
			if (users.length === 0) {
				await db.addUser(mongoUser, mongoPwd, { roles: ['readWrite'] })
				console.log('Usuário do DB adicionado.')
			}
		})

		await mongoClient.close()
	} catch (err) {
		if (err.code === 13) {
			process.exit(0)
		}
		console.log(err)
		process.exit(0)
	}
}

if (
	!process.env.MONGO_USER ||
	!process.env.MONGO_PWD ||
	!process.env.MONGO_URI
) {
	console.log(
		'Adicione o usuário ou senha ou uri do mongodb no seu arquivo arquivo .env'
	)
	process.exit(0)
} else {
	addDbUser()
}
