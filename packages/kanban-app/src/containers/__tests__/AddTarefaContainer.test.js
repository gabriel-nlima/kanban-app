import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { ADD_TAREFA, STARTED } from '../../redux/actions/actionTypes'

import AddTarefaContainer from '../AddTarefaContainer'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)
const store = mockStore({ tarefas: [] })

function renderWithRedux(ui, { initialState, store }) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store,
	}
}

const setup = () => {
	const utils = renderWithRedux(<AddTarefaContainer />, {
		initialState: [],
		store: store,
	})
	const inputTitulo = utils.getByPlaceholderText('Titulo')
	const inputConteudo = utils.getByPlaceholderText('Descrição')
	const btnAdicionar = utils.getByText('Nova tarefa')
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
