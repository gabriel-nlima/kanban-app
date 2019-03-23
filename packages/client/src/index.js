import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import configureStore from './redux/store/configureStore'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import Fileds from './containers/Fileds'
import AddTask from './containers/AddTask'
import EditTask from './containers/EditTask'
import Tasks from './containers/Tasks'
import Header from './components/Header'
import NoMatch from './components/NoMatch'
import { getTasks } from './redux/actions/actions'

import 'bootstrap/dist/css/bootstrap.min.css'
const initalState = {
	tasks: [],
	error: false,
	isLoading: false,
}
//Inicia a store com as tarefas do servidor
const store = configureStore(initalState)
store.dispatch(getTasks())
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div className='container'>
				<Header />
				<Switch>
					<Route path='/' exact component={App} />
					<Route path='/tasks' exact component={Tasks} />
					<Route path='/addTask' exact component={AddTask} />
					<Route path='/fileds' exact component={Fileds} />
					<Route path='/editTask' exact component={EditTask} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
