import * as actionsTypes from './actionTypes'
import * as status from '../containers/status'

export function setTarefas() {
	console.log('aqui')
	return {
		type: actionsTypes.SET_TAREFAS,
		tarefas: [
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
		],
	}
}
