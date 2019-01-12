// Import Tarefa model
Tarefa = require('../model/tarefaModel')
// Handle index actions
exports.index = function(req, res) {
	Tarefa.get(function(err, tarefas) {
		if (err) {
			res.json({
				status: 'error',
				message: err,
			})
		}
		res.json({
			status: 'success',
			message: 'Tarefas retrieved successfully',
			tarefas,
		})
	})
}
// Handle create contact actions
exports.new = function(req, res) {
	var tarefa = new Tarefa()
	tarefa.titulo = req.body.titulo ? req.body.titulo : tarefa.titulo
	tarefa.conteudo = req.body.conteudo
	tarefa.status = req.body.status
	tarefa.adicionadoEm = req.body.adicionadoEm
	tarefa.concluidoEm = req.body.concluidoEm ? req.body.concluidoEm : ''
	// save the contact and check for errors
	tarefa.save(function(err) {
		// if (err)
		//     res.json(err);
		res.json({
			message: 'Nova Tarefa adicionada',
			tarefa,
		})
	})
}
// Handle view contact info
exports.view = function(req, res) {
	Tarefa.findById(req.params.tarefa_id, function(err, tarefa) {
		if (err) res.send(err)
		res.json({
			message: 'Carregando Tarefa',
			tarefa,
		})
	})
}
// Handle update contact info
exports.update = function(req, res) {
	Tarefa.findById(req.params.tarefa_id, function(err, tarefa) {
		if (err) res.send(err)
		tarefa.titulo = req.body.titulo ? req.body.titulo : tarefa.titulo
		tarefa.conteudo = req.body.conteudo
		tarefa.status = req.body.status
		tarefa.adicionadoEm = req.body.adicionadoEm
		tarefa.concluidoEm = req.body.concluidoEm ? req.body.concluidoEm : ''
		// save the contact and check for errors
		tarefa.save(function(err) {
			if (err) res.json(err)
			res.json({
				message: 'Tarefa Info updated',
				tarefa,
			})
		})
	})
}
// Handle delete contact
exports.delete = function(req, res) {
	Tarefa.deleteOne(
		{
			_id: req.params.tarefa_id,
		},
		function(err, tarefa) {
			if (err) res.send(err)
			res.json({
				status: 'success',
				message: 'Tarefa deleted',
			})
		}
	)
}
