import React from 'react'
import { forceCheck } from 'react-lazyload'

import FormModal from '../../components/Forms/FormModal'

import Row from 'react-bootstrap/Row'

import * as status from '../../utils/status'
import { handleStatusChange } from '../utils'

import { withRouter } from 'react-router-dom'

import { getProjectTasks, editTask, deleteTask } from '../../redux/task'
import { connect } from 'react-redux'
import EditTask from './EditTask'
import AddTask from './AddTask'
import TaskHeader from '../../components/Layout/TaskHeader'
import TaskList from '../../components/Layout/TaskList'

export class Tasks extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
			task: {},
			showModal: false,
			isEditing: false,
		}
		this.getTaskStatus = this.getTaskStatus.bind(this)
		this.handleStatus = this.handleStatus.bind(this)
		this.handleModal = this.handleModal.bind(this)
		this.onDragOver = this.onDragOver.bind(this)
		this.onDrop = this.onDrop.bind(this)
	}

	getTaskStatus(tasks) {
		const tasksToDo = tasks.filter((t) => t.status === status.TODO)
		const taskBeingDone = tasks.filter(
			(t) => t.status === status.BEING_DONE
		)
		const fineshedTasks = tasks.filter((t) => t.status === status.FINISHED)
		const filedTasks = tasks.filter((t) => t.status === status.FILED)

		return {
			tasksToDo,
			taskBeingDone,
			fineshedTasks,
			filedTasks,
		}
	}

	handleStatus(task, newStatus) {
		handleStatusChange(
			task,
			newStatus,
			this.props.editTask,
			this.props.deleteTask
		)
	}

	handleModal = (task) => {
		if (task) {
			this.setState({
				isEditing: true,
				showModal: !this.state.showModal,
				task,
			})
		} else {
			this.setState({
				isEditing: false,
				showModal: !this.state.showModal,
				task: {},
			})
		}
	}

	onDragOver = (e) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	onDrop = (e, status) => {
		this.handleStatus(JSON.parse(e.dataTransfer.getData('task')), status)
	}

	taskStatus = {
		[status.TODO]: {
			status: status.TODO,
			statusText: 'A FAZER',
			emptyTaskText: 'Sem tarefas a fazer.',
			variant: 'info',
		},
		[status.BEING_DONE]: {
			status: status.BEING_DONE,
			statusText: 'FAZENDO',
			emptyTaskText: 'Sem tarefas em andamento.',
			variant: 'warning',
		},
		[status.FINISHED]: {
			status: status.FINISHED,
			statusText: 'FEITO',
			emptyTaskText: 'Nenhuma tarefa concluida.',
			variant: 'success',
		},
	}

	render() {
		const {
			tasksToDo,
			taskBeingDone,
			fineshedTasks,
			filedTasks,
		} = this.getTaskStatus(this.props.tasks)

		return (
			<>
				<TaskHeader
					handleModal={this.handleModal}
					isError={this.props.isError}
					tasksStatus={this.taskStatus}
					tasksLength={[
						tasksToDo.length,
						taskBeingDone.length,
						fineshedTasks.length,
						filedTasks.length,
					]}
				/>
				<Row
					className='tasks'
					id='tasks-container'
					onScroll={forceCheck}
				>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatus}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={this.taskStatus[status.TODO]}
						tasks={tasksToDo}
					/>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatus}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={this.taskStatus[status.BEING_DONE]}
						tasks={taskBeingDone}
					/>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatus}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={this.taskStatus[status.FINISHED]}
						tasks={fineshedTasks}
					/>
				</Row>
				<FormModal
					data={this.state.task}
					showModal={this.state.showModal}
					Form={this.state.isEditing ? EditTask : AddTask}
					hide={this.handleModal}
				/>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.task.tasks,
		isError: state.current.isError,
		isLoading: state.current.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getProjectTasks: () => dispatch(getProjectTasks()),
		editTask: (task) => dispatch(editTask(task)),
		deleteTask: (task) => dispatch(deleteTask(task)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks))
