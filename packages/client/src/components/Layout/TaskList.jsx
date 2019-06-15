import React from 'react'

import Task from '../Task'
import Spinner from '../common/Spinner'
import { ActionsDropdown } from '../ActionsDropdown'

import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import * as status from '../../utils/status'

const TaskList = ({
	tasks,
	taskStatus,
	onDrop,
	onDragOver,
	isLoading,
	handleModal,
	handleStatusChange,
}) => {
	let statusText = ''
	let emptyTaskText = ''
	let variant = 'primary'

	switch (taskStatus) {
		case status.TODO:
			statusText = 'A FAZER'
			emptyTaskText = 'Sem tarefas a fazer.'
			variant = 'info'
			break
		case status.BEING_DONE:
			statusText = 'FAZENDO'
			emptyTaskText = 'Sem tarefas em andamento.'
			variant = 'warning'
			break
		case status.FINISHED:
			statusText = 'FEITO'
			emptyTaskText = 'Nenhuma tarefa concluida.'
			variant = 'success'
			break
		default:
			statusText = 'TAREFAS'
			emptyTaskText = 'Sem tarefas.'
	}

	return (
		<>
			<Col
				xs={6}
				sm={6}
				md={4}
				lg={4}
				xl={4}
				onDragOver={(e) => onDragOver(e)}
				onDrop={(e) => onDrop(e, taskStatus)}
			>
				<h3 className={`text-center text-${variant}`}>
					{statusText}
					<Badge pill variant={variant} className='margin-left-minor'>
						{tasks.length}
					</Badge>
				</h3>
				{tasks.length === 0 ? (
					<h4 className='text-center'>{emptyTaskText}</h4>
				) : (
					<></>
				)}
				{isLoading ? (
					<Spinner bg={`text-${variant}`} />
				) : (
					tasks.map((task) => (
						<Task
							key={task._id}
							background={variant}
							task={task}
							OnClickAction={ActionsDropdown}
							handleStatusChange={handleStatusChange}
							handleModal={handleModal}
						/>
					))
				)}
			</Col>
		</>
	)
}

export default TaskList
