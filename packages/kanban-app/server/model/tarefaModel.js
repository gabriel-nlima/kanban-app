var mongoose = require('mongoose')
// Setup schema
var tarefasSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: true,
	},
	conteudo: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	adicionadoEm: String,
	concluidoEm: String,
	create_date: {
		type: Date,
		default: Date.now,
	},
})
// Export Tarefa model
var Tarefa = (module.exports = mongoose.model('tarefas', tarefasSchema))
module.exports.get = function(callback, limit) {
	Tarefa.find(callback).limit(limit)
}
