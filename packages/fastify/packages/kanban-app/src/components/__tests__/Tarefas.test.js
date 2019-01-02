import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Tarefa from '../Tarefa'
import Tarefas from '../Tarefas'

afterEach(cleanup)
describe('Tarefas', () => {
	test('renderiza uma lista de tarefas a partir de um array de tarefas', () => {
		//Arrange
		const props = {
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

		//Act
		const { getByText } = render(<Tarefas {...props} />)

		//Assert
		const tituloNode = getByText(props.tarefas[1].titulo)
		const conteudoNode = getByText(props.tarefas[1].conteudo)
		const dataNode = getByText(props.tarefas[1].data)

		expect(tituloNode).toBeDefined()
		expect(conteudoNode).toBeDefined()
		expect(dataNode).toBeDefined()
	})
})
