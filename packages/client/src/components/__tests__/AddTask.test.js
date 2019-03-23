import React from 'react'
import { cleanup } from 'react-testing-library'
import AddTask from '../Formtask'
import { renderWithRouter } from '../../utils/utils'

afterEach(cleanup)
describe('Adiciona task', () => {
	test('renderiza o formulário para adicionar uma nova task', () => {
		//Arrange
		const handleInputChange = jest.fn()
		const submitTask = jest.fn()
		const task = {
			title: 'Fazer o quadro Kanban',
			desc: 'Fazer o quadro Kanban com react, redux etc',
			addedIn: '02/01/2019',
			finishedIn: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		}
		//Act
		const { getByText, getByPlaceholderText } = renderWithRouter(
			<AddTask
				task={task}
				handleChange={handleInputChange}
				handleSubmit={submitTask}
			/>
		)

		//Assert
		const titleNode = getByPlaceholderText('Titulo')
		const btnSubmit = getByText('Salvar tarefa')

		expect(titleNode).toBeDefined()
		expect(btnSubmit).toBeDefined()
	})
})
