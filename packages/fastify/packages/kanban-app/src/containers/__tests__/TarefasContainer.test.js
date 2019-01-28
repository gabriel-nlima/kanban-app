import React from 'react'
import { cleanup, fireEvent } from 'react-testing-library'

import TarefasContainerConnected, {
	TarefasContainer,
} from '../TarefasContainer'
import * as status from '../status'

import renderWithRedux, { renderWithRouter } from '../../utils/utils'

describe('Tarefas', () => {
	afterEach(cleanup)

	test('renderiza o quadro de tarefas', () => {
		//Arrange
		//Act
		const { getByText } = renderWithRedux(<TarefasContainerConnected />)

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
	test('deve renderizar um quadro de tarefas com 3 tarefas', () => {
		const mockTrocaStatus = jest.fn()
		const mockGet = jest.fn()

		const tarefas = [
			{
				titulo: 'fazer algo1',
				conteudo: 'fazer alguma coisa1',
				status: status.FAZER,
				adicionadoEm: '28/01',
			},
			{
				titulo: 'fazer algo2',
				conteudo: 'fazer alguma coisa2',
				status: status.FAZENDO,
				adicionadoEm: '28/01',
			},
			{
				titulo: 'fazer algo3',
				conteudo: 'fazer alguma coisa3',
				status: status.CONCLUIDO,
				adicionadoEm: '28/01',
			},
		]
		const { asFragment } = renderWithRedux(
			<TarefasContainer
				tarefas={tarefas}
				getTarefas={mockGet}
				trocaStatus={mockTrocaStatus}
			/>
		)

		expect(asFragment()).toMatchSnapshot()
	})
	test('deve renderizar 1 tarefa e trocar o status', () => {
		const mockTrocaStatus = jest.fn()
		const mockGet = jest.fn()

		const tarefas = [
			{
				titulo: 'fazer algo1',
				conteudo: 'fazer alguma coisa1',
				status: status.FAZER,
				adicionadoEm: '28/01',
			},
		]
		const { getByText } = renderWithRedux(
			<TarefasContainer
				tarefas={tarefas}
				getTarefas={mockGet}
				trocaStatus={mockTrocaStatus}
			/>
		)

		const tituloT1 = getByText(tarefas[0].titulo)
		const btnFazer = getByText('Fazer')

		expect(tituloT1).toBeDefined()

		fireEvent.click(btnFazer)
		expect(mockTrocaStatus).toHaveBeenCalledTimes(1)
		expect(mockGet).toHaveBeenCalledTimes(1)
	})
})
