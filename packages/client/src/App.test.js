import React from 'react'

import App from './App'

import { render, cleanup } from 'react-testing-library'

import { MemoryRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from '../src/redux/store/configureStore'

function renderWithRedux(
	ui,
	{ initialState, store = configureStore(initialState) } = {}
) {
	return {
		...render(
			<Provider store={store}>
				<MemoryRouter>{ui}</MemoryRouter>
			</Provider>
		),
		store,
	}
}
afterEach(cleanup)
it('renders without crashing', () => {
	renderWithRedux(<App />)
})
