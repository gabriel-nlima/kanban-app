import React from 'react'
import { cleanup, fireEvent } from 'react-testing-library'

import { Fileds } from '../Fileds'
import * as status from '../status'

import renderWithRedux from '../../utils/utils'

describe('Tasks Arquivadas', () => {
	afterEach(cleanup)

	test('deve renderizar um quadro de tarefas com 2 tarefas arquivdas', () => {
		const mockGet = jest.fn()
		const mockDelete = jest.fn()

		const tasks = [
			{
				title: 'fazer algo1',
				desc: 'fazer alguma coisa1',
				status: status.FAZER,
				addedIn: '28/01',
			},
			{
				title: 'fazer algo2',
				desc: 'fazer alguma coisa2',
				status: status.ARQUIVADO,
				addedIn: '28/01',
			},
			{
				title: 'fazer algo3',
				desc: 'fazer alguma coisa3',
				status: status.ARQUIVADO,
				addedIn: '28/01',
			},
		]
		const { asFragment } = renderWithRedux(
			<Fileds tasks={tasks} getTasks={mockGet} deleteTask={mockDelete} />
		)

		expect(asFragment()).toMatchSnapshot()
	})
	test('deve renderizar 1 task e trocar o status', () => {
		const mockDelete = jest.fn()
		const mockGet = jest.fn()

		const tasks = [
			{
				title: 'fazer algo1',
				desc: 'fazer alguma coisa1',
				status: status.ARQUIVADO,
				addedIn: '28/01',
			},
		]
		const { getByText, getByTestId } = renderWithRedux(
			<Fileds tasks={tasks} getTasks={mockGet} deleteTask={mockDelete} />
		)

		const titleT1 = getByText(tasks[0].title)
		const badge = getByTestId('badge')
		const btnDelete = getByText('Deletar')

		expect(titleT1).toBeDefined()
		expect(badge.innerHTML).toEqual('1')

		fireEvent.click(btnDelete)
		expect(mockDelete).toHaveBeenCalledTimes(1)
	})
})
