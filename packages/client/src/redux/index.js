import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

//Reducers
import task from './task'
import project from './project'
import current from './currentState'

const middleWares = [thunk]

const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
})
middleWares.push(loggerMiddleware)

const reducers = combineReducers({
	task,
	project,
	current,
})

const initialState = {
	task: {
		tasks: [],
	},
	project: {
		projects: [],
	},
	current: {
		activeProject: { tasks: [] },
		isLoading: false,
		isError: false,
		error: [],
	},
}

export default function configureStore() {
	return createStore(
		reducers,
		initialState,
		compose(applyMiddleware(...middleWares))
	)
}
