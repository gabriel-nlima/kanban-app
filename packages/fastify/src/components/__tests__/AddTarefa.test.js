import React from 'react'
import { render, cleanup } from 'react-testing-library'
import AddTarefa from '../FormTarefa'

afterEach(cleanup)
describe('Adiciona Tarefa', () => {
	test('renderiza o formulário para adicionar uma nova tarefa', () => {
		//Arrange
		const handleInputChange = jest.fn()
		const submitTarefa = jest.fn()
		const tarefa = {
			titulo: 'Fazer o quadro Kanban',
			conteudo: 'Fazer o quadro Kanban com react, redux etc',
			adicionadoEm: '02/01/2019',
			concluidoEm: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		}
		//Act
		const { getByText, getByPlaceholderText } = render(
			<AddTarefa
				tarefa={tarefa}
				handleChange={handleInputChange}
				handleSubmit={submitTarefa}
			/>
		)

		//Assert
		const tituloNode = getByPlaceholderText('Titulo')
		const btnText = getByText('Salvar Tarefa')

		expect(tituloNode).toBeDefined()
		expect(btnText).toBeDefined()
	})
})
