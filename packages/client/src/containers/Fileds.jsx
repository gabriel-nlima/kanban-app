import React from 'react'
import Task from '../components/task/Task'
import Spinner from '../components/Spinner'
import { ActionsDropdown } from '../components/ActionsDropdown'
import { CustomAlert } from '../components/CustomAlert'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

import * as status from '../utils/status'

import { Link } from 'react-router-dom'

import { getTasks, deleteTask, editTask } from '../redux/task'
import { connect } from 'react-redux'

export class Fileds extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			task: {},
		}
		this.handleStatusChange = this.handleStatusChange.bind(this)
		this.handleModal = this.handleModal.bind(this)
	}

	componentDidMount() {
		//this.props.getTasks()
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
	handleModal = (task) => {
		this.setState({ showModal: !this.state.showModal, task })
	}

	render() {
		const filedTasks = this.props.tasks.filter(
			(t) => t.status === status.FILED
		)
		const badgeMargin = { marginLeft: 5 }

		return (
			<React.Fragment>
				<Row>
					<Col xs={6}>
						<h4 className='text-secondary'>
							Tarefas arquivadas:
							<span
								data-testid='badge'
								style={badgeMargin}
								className='badge badge-pill badge-secondary'
							>
								{filedTasks.length}
							</span>
						</h4>
					</Col>
					<Col xs={6} className='text-right'>
						<Link className='btn btn-primary' to='/'>
							Todas as tarefas
						</Link>
					</Col>
				</Row>
				{this.props.isError ? <CustomAlert Link={Link} /> : <></>}
				{filedTasks.length === 0 ? (
					<Row style={{ marginTop: 10 }}>
						<Col xs='12' className='text-center'>
							<h3>Você não tem tarefas arquivadas.</h3>
						</Col>
					</Row>
				) : (
					<></>
				)}
				<Row style={{ marginTop: 10 }}>
					{this.props.isLoading ? (
						<Col xs='12' className='text-center'>
							<Spinner bg='text-secondary' />
						</Col>
					) : (
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
							<CardColumns>
								{filedTasks.map((task) => (
									<Task
										key={task._id}
										{...task}
										task={task}
										background='secondary'
										OnClickAction={ActionsDropdown}
										handleStatusChange={
											this.handleStatusChange
										}
										handleModal={this.handleModal}
									/>
								))}
							</CardColumns>
						</Col>
					)}
				</Row>
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
		deleteTask: (task) => dispatch(deleteTask(task)),
		editTask: (task) => dispatch(editTask(task)),
		getTasks: () => dispatch(getTasks()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Fileds)
