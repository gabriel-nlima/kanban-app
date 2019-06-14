import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const NoMatch = ({ location }) => (
	<Row>
		<Col>
			<Alert variant='danger'>
				URL {location.pathname} não encontrada.{' '}
				<Link className='alert-link' to='/'>
					Ir para página inicial
				</Link>
			</Alert>
		</Col>
	</Row>
)

export default NoMatch
