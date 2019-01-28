import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import configureStore from './redux/store/configureStore'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import ArquivadasContainer from './containers/ArquivadasContainer'
import EditarTarefaContainer from './containers/EditarTarefaContainer'
import TarefasContainer from './containers/TarefasContainer'
import Header from './components/Header'
import { getAllTarefas } from './redux/actions/actions'

import 'bootstrap/dist/css/bootstrap.min.css'
const initalState = {
	tarefas: [],
	error: false,
}
//Inicia a store com as tarefas do servidor
const store = configureStore(initalState)
store.dispatch(getAllTarefas())
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div className='container'>
				<Header />
				<Switch>
					<Route path='/' exact component={App} />
					<Route path='/tarefas' exact component={TarefasContainer} />
					<Route
						path='/arquivadas'
						exact
						component={ArquivadasContainer}
					/>
					<Route
						path='/editar'
						exact
						component={EditarTarefaContainer}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
