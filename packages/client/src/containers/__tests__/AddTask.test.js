import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { STARTED } from '../../redux/actions/actionTypes'

import renderWithRedux from '../../utils/utils'

import AddTask from '../AddTask'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ tarefas: [] })

const setup = () => {
	const utils = renderWithRedux(<AddTask />, {
		initialState: [],
		store: store,
	})
	const inputTitle= utils.getByPlaceholderText('Titulo')
	const inputDesc = utils.getByPlaceholderText('Descrição')
	const btnAdd = utils.getByText('Salvar Tarefa')
	return {
		inputTitle,
		inputDesc,
		btnAdd,
		...utils,
	}
}
afterEach(cleanup)
describe('AddTask', () => {
	test('renderiza o formulario, insere uma tarefa e verifica se action STARTED foi despachada', () => {
		//A tarefa enviada não será igual devido a data e id
		const expectedActions = { type: STARTED }
		const { inputTitle, inputDesc, btnAdd } = setup()
		fireEvent.change(inputTitle, { target: { value: 'Fazer algo' } })
		fireEvent.change(inputDesc, {
			target: { value: 'Fazer alguma coisa' },
		})
		fireEvent.click(btnAdd)
		const actions = store.getActions()
		expect(actions[0].type).toEqual(expectedActions.type)
	})
})
