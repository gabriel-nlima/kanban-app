import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

export const CustomAlert = ({ Link }) => (
	<Row>
		<Col xs={12}>
			<Alert variant='danger'>
				Algo deu errado,{' '}
				<Link
					className='alert-link'
					to='/'
					onClick={() => window.location.reload()}
				>
					recarregue a página.
				</Link>
			</Alert>
		</Col>
	</Row>
)
