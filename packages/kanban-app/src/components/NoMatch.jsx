import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = ({ location }) => {
	return (
		<div className='row'>
			<header className='text-left'>
				<h4 className='text-danger'>
					URL {location.pathname} não encontrada.
				</h4>
				<Link to='/' className='btn btn-primary'>
					Ir para página inicial
				</Link>
			</header>
		</div>
	)
}

export default NoMatch
