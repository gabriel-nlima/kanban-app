import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

export const CustomAlert = ({ Link, message }) => (
	<Row>
		<Col xs={12}>
			<Alert variant='danger'>
				<Link
					className='alert-link'
					to='/'
					onClick={() => window.location.reload()}
				>
					{message ||
						'Algo deu errado. Aguarde ou recarregue a página.'}
				</Link>
			</Alert>
		</Col>
	</Row>
)
