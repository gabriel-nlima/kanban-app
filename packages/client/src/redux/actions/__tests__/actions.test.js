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
	test('Despacha action started e get success', () => {
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
				status: status.FAZENDO,
				addedIn: '28/01',
			},
			{
				title: 'fazer algo3',
				desc: 'fazer alguma coisa3',
				status: status.CONCLUIDO,
				addedIn: '28/01',
			},
		]

		const resp = { data: { tasks } }
		axios.get.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.GET_tasks,
				tasks: tasks,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.getAllTasks()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('Despacha action started e failed', () => {
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
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.getAllTasks()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})

describe('Add actions', () => {
	afterEach(cleanup)
	test('Despacha action started e add success', () => {
		const task = {
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
		}

		const resp = { data: { task } }
		axios.post.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.ADD_TASK,
				task,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.addTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('Despacha action add started e failed', () => {
		const error = Error('Network Error')
		const task = {
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
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
		return store.dispatch(actions.addTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})

describe('update action', () => {
	test('Despacha started e update success', () => {
		const task = {
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
		}

		const resp = { data: { task } }
		axios.put.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.UPDATE_task,
				task,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.editTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('Despacha action update started e failed', () => {
		const error = Error('Network Error')
		const task = {
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
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
		return store.dispatch(actions.editTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})

describe('delete action', () => {
	test('Despacha action started e add success', () => {
		const task = {
			_id: 2,
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
		}

		const resp = { data: { task } }
		axios.delete.mockImplementationOnce(() => Promise.resolve(resp))

		const expectedActions = [
			{ type: actionTypes.STARTED, isLoading: true, error: false },
			{
				type: actionTypes.DELETE_TASK,
				task,
				isLoading: false,
				error: false,
			},
		]
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.deleteTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
	test('Despacha action add started e failed', () => {
		const error = Error('Network Error')
		const task = {
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
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
		const store = mockStore({ tasks: [] })
		return store.dispatch(actions.deleteTask(task)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
