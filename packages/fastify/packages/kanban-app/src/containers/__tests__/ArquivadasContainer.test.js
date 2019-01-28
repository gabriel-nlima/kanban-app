import React from 'react'
import { cleanup, fireEvent } from 'react-testing-library'

import ArquivadasConnected, {
	ArquivadasContainer,
} from '../ArquivadasContainer'
import * as status from '../status'

import renderWithRedux from '../../utils/utils'

describe('Tarefas Arquivadas', () => {
	afterEach(cleanup)

	test('deve renderizar um quadro de tarefas com 2 tarefas arquivdas', () => {
		const mockGet = jest.fn()
		const mockDelete = jest.fn()

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
				status: status.ARQUIVADO,
				adicionadoEm: '28/01',
			},
			{
				titulo: 'fazer algo3',
				conteudo: 'fazer alguma coisa3',
				status: status.ARQUIVADO,
				adicionadoEm: '28/01',
			},
		]
		const { asFragment } = renderWithRedux(
			<ArquivadasContainer
				tarefas={tarefas}
				getTarefas={mockGet}
				deletaTarefa={mockDelete}
			/>
		)

		expect(asFragment()).toMatchSnapshot()
	})
	test('deve renderizar 1 tarefa e trocar o status', () => {
		const mockDelete = jest.fn()
		const mockGet = jest.fn()

		const tarefas = [
			{
				titulo: 'fazer algo1',
				conteudo: 'fazer alguma coisa1',
				status: status.ARQUIVADO,
				adicionadoEm: '28/01',
			},
		]
		const { getByText, getByTestId } = renderWithRedux(
			<ArquivadasContainer
				tarefas={tarefas}
				getTarefas={mockGet}
				deletaTarefa={mockDelete}
			/>
		)

		const tituloT1 = getByText(tarefas[0].titulo)
		const badge = getByTestId('badge')
		const btnDelete = getByText('Deletar')

		expect(tituloT1).toBeDefined()
		expect(badge.innerHTML).toEqual('1')

		fireEvent.click(btnDelete)
		expect(mockDelete).toHaveBeenCalledTimes(1)
		expect(mockGet).toHaveBeenCalledTimes(1)
	})
})
