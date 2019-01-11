import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import configureStore from './redux/store/configureStore'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import ArquivadasContainer from './containers/ArquivadasContainer'
import TarefasContainer from './containers/TarefasContainer'
import Header from './components/Header'

import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()
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
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
