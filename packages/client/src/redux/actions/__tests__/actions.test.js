import { cleanup } from 'react-testing-library'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as status from '../../../containers/status'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('axios')
afterEach(cleanup)

describe('Get actions', () => {
	afterEach(cleanup)
	test('dispacha action started e get success', () => {
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

		const resp = { data: { tarefas } }
		axios.get.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.GET_TAREFAS,
				tarefas: tarefas,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store.dispatch(actions.getAllTarefas()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('dispacha action started e failed', () => {
		const error = Error('Network Error')
		axios.get.mockImplementationOnce(() => Promise.reject(error))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.FAILED,
				error: error.message,
				isLoading: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store.dispatch(actions.getAllTarefas()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})

describe('Add actions', () => {
	afterEach(cleanup)
	test('dispacha action started e add success', () => {
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}

		const resp = { data: { tarefa } }
		axios.post.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.ADD_TAREFA,
				tarefa,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store.dispatch(actions.addTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('dispacha action add started e failed', () => {
		const error = Error('Network Error')
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}
		axios.post.mockImplementationOnce(() => Promise.reject(error))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.FAILED,
				error: error.message,
				isLoading: false,
			},
		]
		const store = mockStore({ contacts: [] })
		return store.dispatch(actions.addTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})

describe('update action', () => {
	test('dispacha started e update success', () => {
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}

		const resp = { data: { tarefa } }
		axios.put.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.UPDATE_TAREFA,
				tarefa,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store.dispatch(actions.editarTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('dispacha action update started e failed', () => {
		const error = Error('Network Error')
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}
		axios.put.mockImplementationOnce(() => Promise.reject(error))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.FAILED,
				isLoading: false,
				error: error.message,
			},
		]
		const store = mockStore({ contacts: [] })
		return store.dispatch(actions.editarTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('deve trocar o status', () => {
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}

		const resp = { data: { tarefa } }
		axios.put.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.TROCA_STATUS,
				tarefa,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store
			.dispatch(actions.trocaStatus(tarefa, status.FAZENDO))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
	})
})

describe('delete action', () => {
	test('dispacha action started e add success', () => {
		const tarefa = {
			_id: 2,
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}

		const resp = { data: { tarefa } }
		axios.delete.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.DELETE_TAREFA,
				tarefa,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tarefas: [] })
		return store.dispatch(actions.deletaTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('dispacha action add started e failed', () => {
		const error = Error('Network Error')
		const tarefa = {
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
		}
		axios.delete.mockImplementationOnce(() => Promise.reject(error))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.FAILED,
				isLoading: false,
				error: error.message,
			},
		]
		const store = mockStore({ contacts: [] })
		return store.dispatch(actions.deletaTarefa(tarefa)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
