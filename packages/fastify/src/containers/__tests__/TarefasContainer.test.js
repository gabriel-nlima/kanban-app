import React from 'react'
import { cleanup } from 'react-testing-library'

import TarefasContainer from '../TarefasContainer'

import renderWithRedux from '../../utils/utils'

afterEach(cleanup)
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
