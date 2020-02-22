import React from 'react'
import LazyLoad from 'react-lazyload'

import Task from '../Task'
import Spinner from '../common/Spinner'

import Col from 'react-bootstrap/Col'

const TaskList = ({
	tasks,
	taskStatus,
	onDrop,
	onDragOver,
	isLoading,
	handleModal,
	handleStatusChange,
}) => {
	return (
		<Col
			xs={6}
			sm={6}
			md={4}
			lg={4}
			xl={4}
			onDragOver={(e) => onDragOver(e)}
			onDrop={(e) => onDrop(e, taskStatus.status)}
			id={`task-list-${taskStatus.status}`}
		>
			{tasks.length === 0 ? (
				<h4 className='text-center'>{taskStatus.emptyTaskText}</h4>
			) : (
				<></>
			)}
			{isLoading ? (
				<Spinner bg={`text-${taskStatus.variant}`} />
			) : (
				tasks.map((task) => (
					<LazyLoad
						key={task._id}
						placeholder={
							<div style={{ height: 230 }} className='loading'>
								<Spinner bg={`text-${taskStatus.variant}`} />
							</div>
						}
						height={230}
						once
					>
						<Task
							key={task._id}
							background={taskStatus.variant}
							task={task}
							handleStatusChange={handleStatusChange}
							handleModal={handleModal}
						/>
					</LazyLoad>
				))
			)}
		</Col>
	)
}

export default TaskList
