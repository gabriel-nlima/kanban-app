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

//Common functions
export const handleChange = (e, prevObj) => {
	const input = Object.assign({}, prevObj)
	input[e.target.name] = e.target.value
	return input
}

//Redux Initial State
export const initialState = {
	task: {
		tasks: [],
	},
	project: {
		projects: [],
		activeProject: { tasks: [] },
	},
	currentState: {
		isLoading: false,
		isError: false,
		error: [],
	},
}
