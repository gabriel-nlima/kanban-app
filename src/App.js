import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'

import TarefasContainer from './containers/TarefasContainer'
import AddTarefaContainer from './containers/AddTarefaContainer'

export class App extends Component {
	render() {
		return (
			<div className='App container'>
				<Header />
				<AddTarefaContainer />
				<TarefasContainer />
			</div>
		)
	}
}

export default App
