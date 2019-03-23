import React from 'react'
import { render, cleanup } from 'react-testing-library'
import AddTarefa from '../AddTarefa'

afterEach(cleanup)
describe('Adiciona Tarefa', () => {
	test('renderiza o formulário para adicionar uma nova tarefa', () => {
		//Arrange

		//Act
		const { getByText, getByPlaceholderText } = render(<AddTarefa />)

		//Assert
		const tituloNode = getByPlaceholderText('Titulo da tarefa')
		const btnText = getByText('Adicionar tarefa')

		expect(tituloNode).toBeDefined()
		expect(btnText).toBeDefined()
	})
})
