import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Header from '../Header'

describe('Header', () => {
	afterEach(cleanup)
	test('Renderiza a header do quadro kanban', () => {
		const { getByText } = render(<Header />)

		const headerNode = getByText('Quadro Kanban')

		expect(headerNode).toBeDefined()
	})
})
