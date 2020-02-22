import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

const TaskHeader = ({ handleModal, isError, tasksStatus, tasksLength }) => (
	<>
		<Row className='text-left'>
			<Col xs={6} sm={6} md={6} lg={6} xl={6}>
				<h5 className='text-muted'>
					<Link
						to='/fileds'
						replace={true}
						className='btn btn-secondary'
					>
						ARQUIVADAS{' '}
						<Badge
							pill
							variant='info'
							className='margin-left-minor'
						>
							{tasksLength[3]}
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
		<Row>
			{Object.values(tasksStatus).map((item, index) => (
				<Col xs={6} sm={6} md={4} lg={4} xl={4} key={item.status}>
					<h3 className={`text-center text-${item.variant}`}>
						{item.statusText}
						<Badge
							pill
							variant={item.variant}
							className='margin-left-minor'
						>
							{tasksLength[index]}
						</Badge>
					</h3>
				</Col>
			))}
		</Row>
	</>
)

export default TaskHeader
