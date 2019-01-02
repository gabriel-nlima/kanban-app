import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Quadro from '../Quadro'

afterEach(cleanup)
describe('Tarefa', () => {
	test('renderiza um quadro com cabeçalhos', () => {
		//Arrange

		//Act
		const { getByText } = render(<Quadro />)

		//Assert
		const fazerNode = getByText('A FAZER')
		const fazendoNode = getByText('FAZENDO')
		const feitoNode = getByText('FEITO')

		expect(fazerNode).toBeDefined()
		expect(fazendoNode).toBeDefined()
		expect(feitoNode).toBeDefined()
	})
})
