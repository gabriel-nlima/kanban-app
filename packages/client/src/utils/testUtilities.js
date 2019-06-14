import React from 'react'

import { render } from 'react-testing-library'

import { Provider } from 'react-redux'
import configureStore from '../redux'

import { MemoryRouter } from 'react-router-dom'

//Test Utilities
export default function renderWithRedux(
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

export function renderWithMockStore(ui, { initialState, store }) {
	return {
		...render(
			<Provider store={store}>
				<MemoryRouter>{ui}</MemoryRouter>
			</Provider>
		),
		store,
	}
}

export function renderWithRouter(ui) {
	return {
		...render(<MemoryRouter>{ui}</MemoryRouter>),
	}
}
