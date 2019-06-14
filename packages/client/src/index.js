import React from 'react'
import ReactDOM from 'react-dom'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import configureStore from './redux'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import App from './App'

import AddProject from './containers/Project/AddProject'
import EditProject from './containers/Project/EditProject'
import Projects from './containers/Project/Projects'
import ProjectInfos from './containers/Project'

import Header from './components/Layout/Header'
import NoMatch from './components/common/NoMatch'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Container>
				<Header />
				<Switch>
					<Route path='/' exact component={App} />
					<Route path='/addProject' exact component={AddProject} />
					<Route path='/editProject' exact component={EditProject} />
					<Route path='/projects' exact component={Projects} />
					<Route
						path='/projectInfos'
						exact
						component={ProjectInfos}
					/>
					<Route
						path='/projectInfos/'
						exact
						component={ProjectInfos}
					/>
					<Route
						path='/projectInfos/fileds'
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
