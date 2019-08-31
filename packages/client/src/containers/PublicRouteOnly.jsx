import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRouteOnly = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			!localStorage.getItem('kanbanauthtoken') ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: '/home', state: { from: props.location } }}
				/>
			)
		}
	/>
)

export default PublicRouteOnly
