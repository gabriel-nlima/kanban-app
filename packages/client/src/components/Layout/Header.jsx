import React from 'react'
import { withRouter } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Header = (props) => (
	<header style={{ marginTop: '5px' }}>
		<Row>
			<Col className='text-left' xs={6}>
				<h3>Quadro Kanban</h3>
			</Col>
			{localStorage.getItem('kanbanauthtoken') !== null && (
				<Col className='text-right' xs={6}>
					<Button
						size='sm'
						onClick={() => {
							localStorage.removeItem('kanbanauthtoken')
							props.history.push('/')
						}}
					>
						Sair
					</Button>
				</Col>
			)}
		</Row>
		<Row>
			<Col>
				<h4 className='text-muted'>
					Crie e acompanhe projetos e suas respectivas tarefas
				</h4>
			</Col>
		</Row>
	</header>
)

export default withRouter(Header)
