// FileName: index.js
// Import express
let express = require('express')
// Import routes
let apiRoutes = require('./api/api-route')
// Import Body parser
let bodyParser = require('body-parser')
// Import Mongoose
let mongoose = require('mongoose')

// Initialize the app
let app = express()

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.use(bodyParser.json())

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	)

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true)

	// Pass to next layer of middleware
	next()
})

mongoose.connect(
	'mongodb://127.0.0.1:27017/backend-tarefas',
	{ useNewUrlParser: true, useCreateIndex: true }
)
var db = mongoose.connection

// Setup server port
var port = 5000
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))

// Use Api routes in the App
app.use('/', apiRoutes)
// Launch app to listen to specified port

app.listen(port, function() {
	console.log('Running backend on port ' + port)
})
