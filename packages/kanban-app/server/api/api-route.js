let router = require('express').Router()
// Set default API response
router.get('/', function(req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to Quadro Kanban crafted with love!',
	})
})
// Import tarefa controller
var tarefaController = require('../controller/tarefaController')
// Contact routes
router
	.route('/tarefas')
	.get(tarefaController.index)
	.post(tarefaController.new)
router
	.route('/tarefas/:tarefa_id')
	.get(tarefaController.view)
	.patch(tarefaController.update)
	.put(tarefaController.update)
	.delete(tarefaController.delete)
// Export API routes
module.exports = router
