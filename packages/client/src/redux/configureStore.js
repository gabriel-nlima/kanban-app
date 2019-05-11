import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

//Reducers
import task from './task'
import project from './project'

const middleWare = []

middleWare.push(thunk)

const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
})
middleWare.push(loggerMiddleware)

const reducers = combineReducers({
	task,
	project,
})

export default function configureStore(initialState) {
	return createStore(
		reducers,
		initialState,
		compose(applyMiddleware(...middleWare))
	)
}
