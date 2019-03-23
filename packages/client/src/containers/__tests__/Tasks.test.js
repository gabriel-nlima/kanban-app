import React from 'react'
import { cleanup, fireEvent } from 'react-testing-library'

import TasksConnected, { Tasks } from '../Tasks'
import * as status from '../status'

import renderWithRedux from '../../utils/utils'

describe('Tasks', () => {
	afterEach(cleanup)

	test('renderiza o quadro de tasks', () => {
		//Arrange
		//Act
		const { getByText } = renderWithRedux(<TasksConnected />)

		//Assert
		const toDo = getByText('A FAZER')
		const beingDone = getByText('FAZENDO')
		const fineshed = getByText('FEITO')
		const fileds = getByText('ARQUIVADAS')

		expect(toDo).toBeDefined()
		expect(beingDone).toBeDefined()
		expect(fineshed).toBeDefined()
		expect(fileds).toBeDefined()
	})
	test('deve renderizar um quadro de tasks com 3 tasks', () => {
		const mockGet = jest.fn()

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
				status: status.beingDone,
				addedIn: '28/01',
			},
			{
				title: 'fazer algo3',
				desc: 'fazer alguma coisa3',
				status: status.CONCLUIDO,
				addedIn: '28/01',
			},
		]
		const { asFragment } = renderWithRedux(
			<Tasks tasks={tasks} getTasks={mockGet} />
		)

		expect(asFragment()).toMatchSnapshot()
	})
	test('deve renderizar 1 task e trocar o status', () => {
		const mockGet = jest.fn()

		const tasks = [
			{
				title: 'fazer algo1',
				desc: 'fazer alguma coisa1',
				status: status.FAZER,
				addedIn: '28/01',
			},
		]
		const { getByText } = renderWithRedux(
			<Tasks tasks={tasks} getTasks={mockGet} />
		)

		const titleT1 = getByText(tasks[0].title)
		const btnFazer = getByText('Fazer')

		expect(titleT1).toBeDefined()

		fireEvent.click(btnFazer)
	})
})
