import * as actionsTypes from './actionTypes'
import * as status from '../containers/status'

export function setTarefas() {
	const tarefas = [
		{
			id: 1,
			titulo: 'Fazer o quadro Kanban',
			conteudo: 'Fazer o quadro Kanban com react, redux etc',
			data: '02/01/2019',
			status: status.CONCLUIDO,
		},
		{
			id: 2,
			titulo: 'Adiconar o redux',
			conteudo: 'Adicionar o redux ao projeto',
			data: '02/01/2019',
			status: status.FAZENDO,
		},
		{
			id: 3,
			titulo: 'Fazer o backend',
			conteudo: 'fazer o servidor backend do projeto',
			data: '02/01/2019',
			status: status.FAZER,
		},
	]
	const tarefasAFazer = []
	const tarefasSendoFeitas = []
	const tarefasConcluidas = []
	tarefas.map((tarefa) => {
		if (tarefa.length === 0) {
			return []
		}
		if (tarefa.status === status.FAZER) {
			tarefasAFazer.unshift(tarefa)
		} else if (tarefa.status === status.FAZENDO) {
			tarefasSendoFeitas.unshift(tarefa)
		} else if (tarefa.status === status.CONCLUIDO) {
			tarefasConcluidas.unshift(tarefa)
		}
		return { tarefasAFazer, tarefasSendoFeitas, tarefasConcluidas }
	})
	return {
		type: actionsTypes.SET_TAREFAS,
		tarefas: tarefas,
		tarefasAFazer: tarefasAFazer,
		tarefasSendoFeitas: tarefasSendoFeitas,
		tarefasConcluidas: tarefasConcluidas,
	}
}

export function addTarefa(tarefa) {
	tarefa = {
		...tarefa,
		status: status.FAZER,
	}
	return {
		type: actionsTypes.ADD_TAREFA,
		tarefa,
	}
}

export function trocaStatus(tarefa) {
	return {
		type: actionsTypes.TROCA_STATUS,
		tarefa,
	}
}
