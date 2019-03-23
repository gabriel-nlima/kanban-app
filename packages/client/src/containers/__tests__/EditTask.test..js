import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'

import { EditTask } from '../EditTask'
import * as status from '../status'
import { renderWithRouter } from '../../utils/utils'

const mockPush = jest.fn()
const mockSubmit = jest.fn()

//setup
const task = {
	title: 'fazer algo',
	desc: 'fazer alguma coisa',
	status: status.FAZER,
	addedIn: '28/01',
}

afterEach(cleanup)
describe('EditTask', () => {
	test('renderiza o formulario com uma task', () => {
		//A task enviada não será igual devido a data e id
		const editedTask = {
			title: 'fazer outra coisa',
			desc: 'fazer algo ai',
			status: status.FAZER,
			addedIn: '28/01',
		}
		const { getByText, getByTestId } = renderWithRouter(
			<EditTask
				location={{ state: { task } }}
				editartask={mockSubmit}
				history={{ action: [], push: mockPush }}
			/>
		)

		const title = getByTestId('inputTitle')
		const desc = getByTestId('inputDesc')
		const btnSubmit = getByText('Salvar tarefa')
		const btnBack = getByTestId('btnBack')

		expect(title.value).toEqual(task.title)
		expect(desc.value).toEqual(task.desc)

		fireEvent.change(title, { target: { value: editedTask.title } })
		fireEvent.change(desc, {
			target: { value: editedTask.desc },
		})

		expect(title.value).toEqual(editedTask.title)
		expect(desc.value).toEqual(editedTask.desc)

		fireEvent.click(btnSubmit)

		expect(mockSubmit).toHaveBeenCalledTimes(1)

		fireEvent.click(btnBack)

		expect(mockPush).toHaveBeenCalledTimes(1)
	})
})
