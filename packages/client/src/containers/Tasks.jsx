import React from 'react'

import Task from '../components/task/Task'
import Spinner from '../components/Spinner'
import { ActionsDropdown } from '../components/ActionsDropdown'
import { CustomAlert } from '../components/CustomAlert'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import * as status from '../utils/status'

import { Link, withRouter } from 'react-router-dom'

import { getTasks, editTask, deleteTask } from '../redux/task'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

export class Tasks extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
		}
		this.getTaskStatus = this.getTaskStatus.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
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
		if (newStatus === status.DELETED) {
			this.props.deleteTask(task)
		} else {
			this.props.editTask(task)
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

		const badgeMargin = { marginLeft: 6 }

		return (
			<React.Fragment>
				<Row className='text-left'>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						<h5 className='text-muted'>
							<Link to='/fileds' className='btn btn-secondary'>
								ARQUIVADAS{' '}
								<Badge pill variant='info' style={badgeMargin}>
									{filedTasks.length}
								</Badge>
							</Link>
						</h5>
					</Col>
					<Col
						xs={6}
						sm={6}
						md={6}
						lg={6}
						xl={6}
						className='text-right'
					>
						<Button
							variant='primary'
							type='button'
							href='/addTask'
							as={Link}
							to='/addTask'
							disabled={this.props.isError ? true : false}
						>
							Adicionar nova tarefa
						</Button>
					</Col>
				</Row>
				{this.props.isError ? <CustomAlert Link={Link} /> : <></>}
				<Row>
					<Col
						xs={6}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.TODO)}
					>
						<h3 className='text-center text-info'>
							A FAZER
							<Badge pill variant='info' style={badgeMargin}>
								{tasksToDo.length}
							</Badge>
						</h3>
						{tasksToDo.length === 0 ? (
							<h4 className='text-center'>
								Sem tarefas a fazer.
							</h4>
						) : (
							<></>
						)}
						{this.props.isLoading ? (
							<Spinner bg='text-info' />
						) : (
							tasksToDo.map((task) => {
								return (
									<Task
										key={task._id}
										background='info'
										{...task}
										task={task}
										OnClickAction={ActionsDropdown}
										handleStatusChange={
											this.handleStatusChange
										}
									/>
								)
							})
						)}
					</Col>
					<Col
						xs={6}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.BEING_DONE)}
					>
						<h3 className='text-center text-warning'>
							FAZENDO
							<Badge pill variant='warning' style={badgeMargin}>
								{taskBeingDone.length}
							</Badge>
						</h3>
						{taskBeingDone.length === 0 ? (
							<h4 className='text-center'>
								Sem tarefas em andamento.
							</h4>
						) : (
							<></>
						)}
						{this.props.isLoading ? (
							<Spinner bg='text-warning' />
						) : (
							taskBeingDone.map((task) => {
								return (
									<Task
										key={task._id}
										background='warning'
										{...task}
										task={task}
										OnClickAction={ActionsDropdown}
										handleStatusChange={
											this.handleStatusChange
										}
									/>
								)
							})
						)}
					</Col>
					<Col
						xs={12}
						sm={12}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.FINISHED)}
					>
						<h3 className='text-center text-success'>
							FEITO
							<Badge
								pill
								variant='success'
								style={badgeMargin}
								className='badge badge-pill badge-success'
							>
								{fineshedTasks.length}
							</Badge>
						</h3>
						{fineshedTasks.length === 0 ? (
							<h4 className='text-center'>
								Nenhuma tarefa concluida.
							</h4>
						) : (
							<></>
						)}
						{this.props.isLoading ? (
							<Spinner bg='text-success' />
						) : (
							fineshedTasks.map((task) => {
								return (
									<Task
										key={task._id}
										background='success'
										{...task}
										task={task}
										OnClickAction={ActionsDropdown}
										handleStatusChange={
											this.handleStatusChange
										}
									/>
								)
							})
						)}
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

Tasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	editTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
	const tasks = state.task.tasks.filter(
		(el) => el.project_id === state.project.activeProject._id
	)
	return {
		tasks,
		isError: state.currentState.isError,
		isLoading: state.currentState.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getTasks: () => dispatch(getTasks()),
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
