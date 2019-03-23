import { cleanup } from 'react-testing-library'
import reducers from '../reducers'
import * as actionTypes from '../../actions/actionTypes'
import * as status from '../../../containers/status'

describe('reducers de tasks', () => {
	const initialState = {
		tasks: [],
		error: false,
		isLoading: false,
	}
	const tasks = [
		{
			_id: 1,
			title: 'fazer algo1',
			desc: 'fazer alguma coisa1',
			status: status.FAZER,
			addedIn: '28/01',
			finishedIn: undefined,
		},
		{
			_id: 2,
			title: 'fazer algo2',
			desc: 'fazer alguma coisa2',
			status: status.FAZENDO,
			addedIn: '28/01',
			finishedIn: undefined,
		},
		{
			_id: 3,
			title: 'fazer algo3',
			desc: 'fazer alguma coisa3',
			status: status.CONCLUIDO,
			addedIn: '28/01',
			finishedIn: undefined,
		},
	]
	const task = {
		_id: 3,
		title: 'fazer algo4',
		desc: 'fazer alguma coisa4',
		status: status.FAZER,
		addedIn: '28/01',
		finishedIn: undefined,
	}
	afterEach(cleanup)
	test('deve lidar com action started', () => {
		const expectedState = {
			tasks: [],
			error: false,
			isLoading: true,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.STARTED,
				error: false,
				isLoading: true,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com action failed', () => {
		const expectedState = {
			tasks: [],
			error: true,
			isLoading: false,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.FAILED,
				isLoading: false,
				error: true,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com get success', () => {
		const expectedState = {
			tasks: tasks,
			error: false,
			isLoading: false,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.GET_TASKS,
				tasks: tasks,
				isLoading: false,
				error: false,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com add task', () => {
		const expectedState = {
			tasks: [task],
			error: false,
			isLoading: false,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.ADD_TASK,
				task: task,
				isLoading: false,
				error: false,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com update success', () => {
		initialState.tasks = tasks
		const taskAtualizada = {
			_id: 3,
			title: 'fazer qualquer coisa2',
			desc: 'fazer alguma coisa4',
			status: status.FAZER,
			addedIn: '28/01',
			finishedIn: undefined,
		}
		expect(
			reducers(initialState, {
				type: actionTypes.UPDATE_TASK,
				task: taskAtualizada,
				isLoading: false,
				error: false,
			}).tasks
		).toContainEqual(taskAtualizada)
	})
	test('deve lidar com delete success', () => {
		initialState.tasks = [task]
		const expectedState = {
			tasks: [],
			error: false,
			isLoading: false,
		}
		expect(
			reducers(initialState, {
				type: actionTypes.DELETE_TASK,
				task: task,
				isLoading: false,
				error: false,
			})
		).toEqual(expectedState)
	})
})
