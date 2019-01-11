import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Tarefas from '../Tarefas'

import * as status from '../../containers/status'

afterEach(cleanup)
describe('Tarefas', () => {
	test('renderiza uma lista de tarefas a partir de um array de tarefas', () => {
		//Arrange
		const acao = 'FAZER'
		const onChangeStatus = () => {}
		const props = {
			tarefas: [
				{
					titulo: 'Fazer o quadro Kanban',
					conteudo: 'Fazer o quadro Kanban com react, redux etc',
					status: status.FAZER,
					adicionadoEm: '02/01/2019',
					concluidoEm: '02/01/2019',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Adiconar o redux',
					conteudo: 'Adicionar o redux ao projeto',
					status: status.FAZER,
					adicionadoEm: '02/01/2019',
					concluidoEm: '02/01/2019',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
				{
					titulo: 'Fazer o backend',
					conteudo: 'fazer o servidor backend do projeto',
					status: status.FAZER,
					adicionadoEm: '02/01/2019',
					concluidoEm: '02/01/2019',
					background: 'text-white bg-primary',
					btnBg: 'btn-light',
				},
			],
		}
		//Act
		const { getByText } = render(
			<Tarefas {...props} acao={acao} onChangeStatus={onChangeStatus} />
		)

		//Assert
		const tituloNode = getByText(props.tarefas[1].titulo)
		const conteudoNode = getByText(props.tarefas[1].conteudo)

		expect(tituloNode).toBeDefined()
		expect(conteudoNode).toBeDefined()
	})
})
