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

import Entry from './containers/Entry'
import AddProject from './containers/Project/AddProject'
import EditProject from './containers/Project/EditProject'
import ProjectInfos from './containers/Project'
import PrivateRoute from './containers/PrivateRoute'
import PublicRouteOnly from './containers/PublicRouteOnly'
import Profile from './containers/Profile'

import Header from './containers/Header'
import NoMatch from './components/common/NoMatch'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Container>
				<Header />
				<Switch>
					<PublicRouteOnly path='/' exact component={Entry} />
					<PrivateRoute path='/home' exact component={App} />
					<PrivateRoute
						path='/addProject'
						exact
						component={AddProject}
					/>
					<PrivateRoute
						path='/editProject'
						exact
						component={EditProject}
					/>
					<PrivateRoute
						path='/projectInfos'
						exact
						component={ProjectInfos}
					/>
					<PrivateRoute
						path='/projectInfos/'
						exact
						component={ProjectInfos}
					/>
					<PrivateRoute
						path='/projectInfos/fileds'
						exact
						component={ProjectInfos}
					/>
					<PrivateRoute path='/profile' exact component={Profile} />
					<Route component={NoMatch} />
				</Switch>
			</Container>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
serviceWorker.register()
