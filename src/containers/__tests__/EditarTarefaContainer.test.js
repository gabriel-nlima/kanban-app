import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'

import { EditarTarefaContainer } from '../EditarTarefaContainer'
import * as status from '../status'
import { renderWithRouter } from '../../utils/utils'

const mockPush = jest.fn()
const mockSubmit = jest.fn()

//setup
const tarefa = {
	titulo: 'fazer algo',
	conteudo: 'fazer alguma coisa',
	status: status.FAZER,
	adicionadoEm: '28/01',
}

afterEach(cleanup)
describe('EditarTarefaContainer', () => {
	test('renderiza o formulario com uma tarefa', () => {
		//A tarefa enviada não será igual devido a data e id
		const tarefaEditada = {
			titulo: 'fazer outra coisa',
			conteudo: 'fazer algo ai',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}
		const { getByText, getByTestId } = renderWithRouter(
			<EditarTarefaContainer
				location={{ state: { tarefa } }}
				editarTarefa={mockSubmit}
				history={{ action: [], push: mockPush }}
			/>
		)

		const titulo = getByTestId('inputTitulo')
		const conteudo = getByTestId('inputConteudo')
		const salvarBtn = getByText('Salvar Tarefa')
		const voltarBtn = getByTestId('btnVoltar')

		expect(titulo.value).toEqual(tarefa.titulo)
		expect(conteudo.value).toEqual(tarefa.conteudo)

		fireEvent.change(titulo, { target: { value: tarefaEditada.titulo } })
		fireEvent.change(conteudo, {
			target: { value: tarefaEditada.conteudo },
		})

		expect(titulo.value).toEqual(tarefaEditada.titulo)
		expect(conteudo.value).toEqual(tarefaEditada.conteudo)

		fireEvent.click(salvarBtn)

		expect(mockSubmit).toHaveBeenCalledTimes(1)

		fireEvent.click(voltarBtn)

		expect(mockPush).toHaveBeenCalledTimes(2)
	})
})
