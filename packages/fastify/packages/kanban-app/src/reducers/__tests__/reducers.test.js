import { cleanup } from 'react-testing-library'
import * as actionTypes from '../../actions/actionTypes'

import tarefasReducer from '../reducers'

afterEach(cleanup)

describe('Reducer de Tarefas', () => {
	test('Retorna o state da store', () => {
		//Arrange
		const initialState = {
			tarefas: [],
			error: false,
		}

		const action = {
			type: actionTypes.GET_TAREFAS,
			tarefas: [
				{
					titulo: 'Fazer o quadro Kanban',
					conteudo: 'Fazer o quadro Kanban com react, redux etc',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Adiconar o redux',
					conteudo: 'Adicionar o redux ao projeto',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Fazer o backend',
					conteudo: 'fazer o servidor backend do projeto',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
			],
		}
		const returnedState = tarefasReducer(initialState, action)

		expect(returnedState).toEqual({ tarefas: action.tarefas, error: false })
	})

	test('Add uma nova tarefa no state', () => {
		//Arrange
		const initialState = {
			tarefas: [
				{
					titulo: 'Fazer o quadro Kanban',
					conteudo: 'Fazer o quadro Kanban com react, redux etc',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Adiconar o redux',
					conteudo: 'Adicionar o redux ao projeto',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Fazer o backend',
					conteudo: 'fazer o servidor backend do projeto',
					data: '02/01/2019',
					status: 'a fazer',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
			],
			error: false,
		}

		const action = {
			type: actionTypes.ADD_TAREFA,
			tarefas: {
				titulo: 'Fazer AS TELAS',
				conteudo: 'fazer TELAS',
				data: '02/01/2019',
				status: 'a fazer',
				background: 'text-white bg-primary',
				btnBg: 'btn-light',
			},
		}
		const expectedReturn = [
			{
				titulo: 'Fazer AS TELAS',
				conteudo: 'fazer TELAS',
				data: '02/01/2019',
				status: 'a fazer',
				background: 'text-white bg-primary',
				btnBg: 'btn-light',
			},
			{
				titulo: 'Fazer o quadro Kanban',
				conteudo: 'Fazer o quadro Kanban com react, redux etc',
				data: '02/01/2019',
				status: 'a fazer',
				background: 'text-white bg-primary',
				btnBg: 'btn-light',
			},
			{
				titulo: 'Adiconar o redux',
				conteudo: 'Adicionar o redux ao projeto',
				data: '02/01/2019',
				status: 'a fazer',
				background: 'text-white bg-primary',
				btnBg: 'btn-light',
			},
			{
				titulo: 'Fazer o backend',
				conteudo: 'fazer o servidor backend do projeto',
				data: '02/01/2019',
				status: 'a fazer',
				background: 'text-white bg-primary',
				btnBg: 'btn-light',
			},
		]
		//Act
		const returnedState = tarefasReducer(initialState, action)
		//Assert
		expect(returnedState).toEqual({ tarefas: expectedReturn, error: false })
	})
})
