import React from 'react'
import Task from '../../components/Task'
import Spinner from '../../components/common/Spinner'
import { ActionsDropdown } from '../../components/ActionsDropdown'
import { CustomAlert } from '../../components/common/CustomAlert'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

import * as status from '../../utils/status'
import { handleStatusChange } from '../utils'

import { Link } from 'react-router-dom'

import { deleteTask, editTask } from '../../redux/task'
import { connect } from 'react-redux'
import FormModal from '../../components/Forms/FormModal'
import EditTask from './EditTask'

export class Fileds extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			task: {},
		}
		this.handleStatus = this.handleStatus.bind(this)
		this.handleModal = this.handleModal.bind(this)
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
		this.setState({ showModal: !this.state.showModal, task })
	}

	render() {
		const filedTasks = this.props.tasks.filter(
			(t) => t.status === status.FILED
		)

		return (
			<React.Fragment>
				<Row>
					<Col xs={6}>
						<h4 className='text-secondary'>
							Tarefas arquivadas:
							<span
								data-testid='badge'
								className='badge badge-pill badge-secondary margin-left-minor'
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
				{this.props.isError ? (
					<CustomAlert Link={Link} message={this.props.message} />
				) : (
					<></>
				)}
				{filedTasks.length === 0 ? (
					<Row className='margin-top-minor'>
						<Col xs='12' className='text-center'>
							<h3>Você não tem tarefas arquivadas.</h3>
						</Col>
					</Row>
				) : (
					<></>
				)}
				<Row className='margin-top-minor'>
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
										handleStatusChange={this.handleStatus}
										handleModal={this.handleModal}
									/>
								))}
							</CardColumns>
						</Col>
					)}
				</Row>
				<FormModal
					data={this.state.task}
					showModal={this.state.showModal}
					Form={EditTask}
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
		message: state.current.message,
		isLoading: state.current.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		deleteTask: (task) => dispatch(deleteTask(task)),
		editTask: (task) => dispatch(editTask(task)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Fileds)
