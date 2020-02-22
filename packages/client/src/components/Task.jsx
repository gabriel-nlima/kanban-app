import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FILED } from '../utils/status'
import Badge from 'react-bootstrap/Badge'

import { ActionsDropdown } from './ActionsDropdown'

const onDragStart = (e, task) => {
	e.dropEffect = 'move'
	const taskJson = JSON.stringify(task)
	e.dataTransfer.setData('task', taskJson)
	e.dataTransfer.effectAllowed = 'move'
}

const Task = ({ task, background, handleStatusChange, handleModal }) => {
	return (
		<Card
			bg={background}
			key={task._id}
			draggable={task.status === FILED ? false : true}
			onDragStart={(e) => onDragStart(e, task)}
			className={'card w-100 h-auto margin-bottom-minor'}
		>
			<Card.Body className='text-center'>
				<Card.Title>{task.title}</Card.Title>
				<Card.Text className='text-justify'>{task.desc}</Card.Text>
				<Card.Text className='text-left muted-label'>
					Adicionado em: {task.addedIn}
				</Card.Text>
				<Card.Text className='text-left muted-label'>
					{task.finishedIn === undefined || task.finishedIn === ''
						? ''
						: 'Concluido em: ' + task.finishedIn}
				</Card.Text>
				<Card.Text className='text-center'>
					{task.tag1 === undefined ? (
						''
					) : (
						<Badge
							pill
							variant='light'
							className='margin-right-minor'
						>
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
						variant='light'
						size='sm'
						type='button'
						onClick={() => handleModal(task)}
					>
						Editar{' '}
					</Button>
					<ActionsDropdown
						task={task}
						handleStatusChange={handleStatusChange}
					/>
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
}

export default Task
