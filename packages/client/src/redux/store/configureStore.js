import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers/reducers'

const middleWare = []

middleWare.push(thunk)

const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
})
middleWare.push(loggerMiddleware)

export default function configureStore(initialState) {
	return createStore(
		reducer,
		initialState,
		compose(applyMiddleware(...middleWare))
	)
}
