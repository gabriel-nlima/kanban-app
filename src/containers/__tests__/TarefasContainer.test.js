import React from 'react'
import { render, cleanup } from 'react-testing-library'

import { Provider } from 'react-redux'
import configureStore from '../../redux/store/configureStore'

import * as status from '../status'

import TarefasContainer from '../TarefasContainer'

function renderWithRedux(
	ui,
	{ initialState, store = configureStore(initialState) } = {}
) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store,
	}
}
describe('Tarefas', () => {
	afterEach(cleanup)

	test('renderiza o quadro de tarefas', () => {
		//Arrange
		//Act
		const { getByText } = renderWithRedux(<TarefasContainer />)

		//Assert
		const aFazer = getByText('A FAZER')
		const fazendo = getByText('FAZENDO')
		const feito = getByText('FEITO')
		const arquivadas = getByText('ARQUIVADAS:')

		expect(aFazer).toBeDefined()
		expect(fazendo).toBeDefined()
		expect(feito).toBeDefined()
		expect(arquivadas).toBeDefined()
	})
})
