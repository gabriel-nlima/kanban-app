import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = ({ location }) => {
	return (
		<div className='row'>
			<div className='col-12'>
				<div className='alert alert-danger' role='alert'>
					URL {location.pathname} não encontrada.{' '}
					<Link className='alert-link' to='/'>
						Ir para página inicial
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NoMatch
