import React, { Component } from 'react'
import './App.css'

import TarefasContainer from './containers/TarefasContainer'
import AddTarefaContainer from './containers/AddTarefaContainer'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<TarefasContainer />
				<AddTarefaContainer />
			</div>
		)
	}
}

export default App
