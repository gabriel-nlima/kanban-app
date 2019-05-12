import React from 'react'
import ReactDOM from 'react-dom'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import App from './App'

import Fileds from './containers/Fileds'
import AddTask from './containers/AddTask'
import EditTask from './containers/EditTask'
import Tasks from './containers/Tasks'

import AddProject from './containers/AddProject'
import EditProject from './containers/EditProject'
import Projects from './containers/Projects'
import ProjectInfos from './containers/ProjectInfos'

import Header from './components/Header'
import NoMatch from './components/NoMatch'

const initialState = {
	task: {
		tasks: [],
		error: false,
		isLoading: false,
	},
	project: {
		projects: [],
		activeProject: { tasks: [] },
		error: false,
		isLoading: false,
	},
}

const store = configureStore(initialState)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Container>
				<Header />
				<Switch>
					<Route path='/' exact component={App} />
					<Route path='/tasks' exact component={Tasks} />
					<Route path='/addTask' exact component={AddTask} />
					<Route path='/fileds' exact component={Fileds} />
					<Route path='/editTask' exact component={EditTask} />
					<Route path='/addProject' exact component={AddProject} />
					<Route path='/editProject' exact component={EditProject} />
					<Route path='/projects' exact component={Projects} />
					<Route
						path='/projectInfos'
						exact
						component={ProjectInfos}
					/>
					<Route component={NoMatch} />
				</Switch>
			</Container>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
serviceWorker.register()
