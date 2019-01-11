import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Tarefa from '../Tarefa'

describe('Tarefa', () => {
	afterEach(cleanup)
	test('renderiza uma tarefa com titulo, conteudo e data', () => {
		//Arrange
		const acao = { text: 'FAZER', btnBg: 'btn-secondary' }
		const onChangeStatus = () => {}
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
		const { getByText } = render(
			<Tarefa
				tarefa={tarefa}
				acao={acao}
				onClickAction={onChangeStatus}
			/>
		)

		//Assert
		const tituloNode = getByText(tarefa.titulo)
		const conteudoNode = getByText(tarefa.conteudo)

		expect(tituloNode).toBeDefined()
		expect(conteudoNode).toBeDefined()
	})
})
