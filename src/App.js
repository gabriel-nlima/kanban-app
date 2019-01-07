import React, { Component } from 'react'
import './App.css'

import TarefasContainer from './containers/TarefasContainer'
import AddTarefaContainer from './containers/AddTarefaContainer'

export class App extends Component {
	render() {
		return (
			<div className='App'>
				<AddTarefaContainer />
				<TarefasContainer />
			</div>
		)
	}
}

export default App
