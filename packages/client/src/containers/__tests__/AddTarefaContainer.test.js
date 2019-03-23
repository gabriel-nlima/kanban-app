import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { STARTED } from '../../redux/actions/actionTypes'

import renderWithRedux from '../../utils/utils'

import AddTarefaContainer from '../AddTarefaContainer'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)
const store = mockStore({ tarefas: [] })

const setup = () => {
	const utils = renderWithRedux(<AddTarefaContainer />, {
		initialState: [],
		store: store,
	})
	const inputTitulo = utils.getByPlaceholderText('Titulo')
	const inputConteudo = utils.getByPlaceholderText('Descrição')
	const btnAdicionar = utils.getByText('Salvar Tarefa')
	return {
		inputTitulo,
		inputConteudo,
		btnAdicionar,
		...utils,
	}
}
afterEach(cleanup)
describe('AddTarefasContainer', () => {
	test('renderiza o formulario, insere uma tarefa e verifica se action STARTED foi despachada', () => {
		//A tarefa enviada não será igual devido a data e id
		const expectedActions = { type: STARTED }
		const { inputTitulo, inputConteudo, btnAdicionar } = setup()
		fireEvent.change(inputTitulo, { target: { value: 'Fazer algo' } })
		fireEvent.change(inputConteudo, {
			target: { value: 'Fazer alguma coisa' },
		})
		fireEvent.click(btnAdicionar)
		const actions = store.getActions()
		expect(actions[0].type).toEqual(expectedActions.type)
	})
})
