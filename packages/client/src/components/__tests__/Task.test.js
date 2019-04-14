import React from 'react'
import { cleanup, fireEvent } from 'react-testing-library'
import Task from '../task/Task'

import { renderWithRouter } from '../../utils/utils'

describe('Task', () => {
	afterEach(cleanup)
	test('renderiza uma task com titulo, conteudo e data', () => {
		//Arrange
		const acao = { text: 'FAZER', btnBg: 'btn-secondary' }
		const onChangeStatus = jest.fn()
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
		const { getByText } = renderWithRouter(
			<Task task={task} acao={acao} onClickAction={onChangeStatus} />
		)

		//Assert
		const titleNode = getByText(task.title)
		const descNode = getByText(task.desc)
		const btn = getByText(acao.text)

		expect(titleNode).toBeDefined()
		expect(descNode).toBeDefined()
		expect(btn).toBeDefined()
		fireEvent.click(btn)

		expect(onChangeStatus).toHaveBeenCalled()
	})
})
