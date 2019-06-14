import React from 'react'

import FormModal from '../../components/Forms/FormModal'
import { CustomAlert } from '../../components/common/CustomAlert'

import Row from 'react-bootstrap/Row'

import * as status from '../../utils/status'

import { Link, withRouter } from 'react-router-dom'

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
		this.handleStatusChange = this.handleStatusChange.bind(this)
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

	handleStatusChange(task, newStatus) {
		task = {
			...task,
			status: newStatus,
			lastStatus: task.status,
		}

		if (newStatus === status.DELETED) this.props.deleteTask(task)
		else this.props.editTask(task)
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

	onDrop = async (e, status) => {
		let task = JSON.parse(e.dataTransfer.getData('task'))
		await this.handleStatusChange(task, status)
	}

	render() {
		const {
			tasksToDo,
			taskBeingDone,
			fineshedTasks,
			filedTasks,
		} = this.getTaskStatus(this.props.tasks)

		return (
			<React.Fragment>
				<TaskHeader
					filedTasks={filedTasks}
					handleModal={this.handleModal}
					isError={this.props.isError}
				/>
				{this.props.isError ? <CustomAlert Link={Link} /> : <></>}
				<Row>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatusChange}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={status.TODO}
						tasks={tasksToDo}
					/>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatusChange}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={status.BEING_DONE}
						tasks={taskBeingDone}
					/>
					<TaskList
						handleModal={this.handleModal}
						handleStatusChange={this.handleStatusChange}
						isLoading={this.props.isLoading}
						onDragOver={this.onDragOver}
						onDrop={this.onDrop}
						taskStatus={status.FINISHED}
						tasks={fineshedTasks}
					/>
				</Row>
				<FormModal
					data={this.state.task}
					showModal={this.state.showModal}
					Form={this.state.isEditing ? EditTask : AddTask}
					hide={this.handleModal}
				/>
			</React.Fragment>
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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Tasks)
)
