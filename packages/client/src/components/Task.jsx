import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { ARQUIVADO } from '../utils/status'
import Badge from 'react-bootstrap/Badge'

const onDragStart = (e, task) => {
	e.dropEffect = 'move'
	const taskJson = JSON.stringify(task)
	e.dataTransfer.setData('task', taskJson)
	e.dataTransfer.effectAllowed = 'move'
}

const Task = ({ task, background, OnClickAction }) => {
	return (
		<Card
			bg={background}
			key={task._id}
			draggable={task.status === ARQUIVADO ? false : true}
			onDragStart={(e) => onDragStart(e, task)}
			className={'card w-100 h-auto'}
			style={{ marginBottom: 5 }}
		>
			<Card.Body className='text-center'>
				<Card.Title>{task.title}</Card.Title>
				<Card.Text className='text-justify'>{task.desc}</Card.Text>
				<Card.Text style={{ fontSize: 11 }} className='text-left '>
					Adicionado em: {task.addedIn}
				</Card.Text>
				<Card.Text style={{ fontSize: 11 }} className='text-left'>
					{task.finishedIn === undefined
						? ''
						: 'Concluido em: ' + task.finishedIn}
				</Card.Text>
				<Card.Text className='text-center'>
					{task.tag1 === undefined ? (
						''
					) : (
						<Badge pill variant='light' style={{ marginRight: 5 }}>
							{task.tag1}
						</Badge>
					)}
					{task.tag2 === undefined ? (
						''
					) : (
						<Badge pill variant='light'>
							{task.tag2}
						</Badge>
					)}
				</Card.Text>
				<ButtonGroup size='sm'>
					<Button
						href='/editar'
						variant='light'
						size='sm'
						as={Link}
						type='button'
						to={{ pathname: '/editTask', state: { task } }}
					>
						Editar{' '}
					</Button>
					<OnClickAction task={task} />
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}
Task.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		desc: PropTypes.string,
		tag1: PropTypes.string,
		tag2: PropTypes.string,
		addedIn: PropTypes.string.isRequired,
		finishedIn: PropTypes.string,
	}).isRequired,
	OnClickAction: PropTypes.func.isRequired,
}

export default Task
