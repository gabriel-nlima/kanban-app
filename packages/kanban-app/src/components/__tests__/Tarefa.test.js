import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Tarefa from '../Tarefa'

afterEach(cleanup)
describe('Tarefa', () => {
	test('renderiza uma tarefa com titulo, conteudo e data', () => {
		//Arrange
		const props = {
			titulo: 'Fazer o quadro Kanban',
			conteudo: 'Fazer o quadro Kanban com react, redux etc',
			data: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		}

		//Act
		const { getByText } = render(<Tarefa {...props} />)

		//Assert
		const tituloNode = getByText(props.titulo)
		const conteudoNode = getByText(props.conteudo)
		const dataNode = getByText(props.data)

		expect(tituloNode).toBeDefined()
		expect(conteudoNode).toBeDefined()
		expect(dataNode).toBeDefined()
	})
})
