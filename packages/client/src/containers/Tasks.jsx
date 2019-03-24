import React from 'react'
import Task from '../components/Task'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import * as status from '../utils/status'

import { Link } from 'react-router-dom'

import { getTasks, editTask, deleteTask } from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

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
		this.actionsDropdown = this.actionsDropdown.bind(this)
	}

	componentDidMount() {
		if (this.props.tasks.length === 0) {
			this.props.getTasks()
		}
	}

	getTaskStatus(tasks) {
		const tasksToDo = []
		const taskBeingDone = []
		const fineshedTasks = []
		const filedTasks = []
		tasks.map((task) => {
			if (task.length === 0) {
				return []
			}
			if (task.status === status.FAZER) {
				tasksToDo.push(task)
			} else if (task.status === status.FAZENDO) {
				taskBeingDone.push(task)
			} else if (task.status === status.CONCLUIDO) {
				fineshedTasks.push(task)
			} else if (task.status === status.ARQUIVADO) {
				filedTasks.push(task)
			}
			return { tasksToDo, taskBeingDone, fineshedTasks }
		})

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
		if (newStatus === status.DELETADO) {
			this.props.deleteTask(task)
		} else {
			this.props.editTask(task)
		}
	}
	actionsDropdown({ task }) {
		return (
			<DropdownButton size='sm' id='actions' title='Ações'>
				{status.actions.map((action) => {
					let texto = ''
					if (action === status.FAZER) {
						texto = 'A Fazer'
					} else if (action === status.FAZENDO) {
						texto = 'Fazer'
					} else if (action === status.CONCLUIDO) {
						texto = 'Concluir'
					} else if (action === status.ARQUIVADO) {
						texto = 'Arquivar'
					} else {
						texto = 'Deletar'
					}
					return (
						<Dropdown.Item
							key={action}
							onClick={() =>
								this.handleStatusChange(task, action)
							}
						>
							{texto}
						</Dropdown.Item>
					)
				})}
			</DropdownButton>
		)
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
							disabled={this.props.error !== false ? true : false}
						>
							Adicionar nova tarefa
						</Button>
					</Col>
				</Row>
				{this.props.error !== false ? (
					<Row>
						<Col xs={12}>
							<Alert variant='danger'>
								Algo deu errado,{' '}
								<Link
									className='alert-link'
									to='/'
									onClick={() => window.location.reload()}
								>
									recarregue a página.
								</Link>
							</Alert>
						</Col>
					</Row>
				) : (
					''
				)}
				<Row>
					<Col
						xs={6}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.FAZER)}
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
							''
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
										OnClickAction={this.actionsDropdown}
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
						onDrop={(e) => this.onDrop(e, status.FAZENDO)}
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
							''
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
										OnClickAction={this.actionsDropdown}
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
						onDrop={(e) => this.onDrop(e, status.CONCLUIDO)}
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
							''
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
										OnClickAction={this.actionsDropdown}
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
	return {
		tasks: state.tasks,
		error: state.error,
		isLoading: state.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getTasks: () => dispatch(getTasks()),
		editTask: (task) => dispatch(editTask(task)),
		deleteTask: (task) => dispatch(deleteTask(task)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tasks)
