import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

const badgeMargin = { marginLeft: 5 }

const TaskHeader = ({ filedTasks, handleModal, isError }) => (
	<Row className='text-left'>
		<Col xs={6} sm={6} md={6} lg={6} xl={6}>
			<h5 className='text-muted'>
				<Link to='/fileds' replace={true} className='btn btn-secondary'>
					ARQUIVADAS{' '}
					<Badge pill variant='info' style={badgeMargin}>
						{filedTasks.length}
					</Badge>
				</Link>
			</h5>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} className='text-right'>
			<Button
				variant='primary'
				type='button'
				onClick={() => {
					handleModal()
				}}
				disabled={isError}
			>
				Adicionar nova tarefa
			</Button>
		</Col>
	</Row>
)

export default TaskHeader
