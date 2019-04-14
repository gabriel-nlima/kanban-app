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

import { getTasks, deleteTask, editTask } from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

export class Fileds extends React.Component {
	constructor(props) {
		super(props)
		this.handleStatusChange = this.handleStatusChange.bind(this)
	}

	componentDidMount() {
		this.props.getTasks()
	}
	filterFiled(task) {
		if (task.status === status.FILED) {
			return true
		} else {
			return false
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

	render() {
		const filedTask = this.props.tasks.filter(this.filterFiled)
		const badgeMargin = { marginLeft: 6 }

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
								{filedTask.length}
							</span>
						</h4>
					</Col>
					<Col xs={6} className='text-right'>
						<Link className='btn btn-primary' to='/'>
							Voltar para o Quadro Kanban
						</Link>
					</Col>
				</Row>
				{this.props.error !== false ? <CustomAlert Link={Link} /> : ''}
				{filedTask.length === 0 ? (
					<Row style={{ marginTop: 10 }}>
						<Col xs='12' className='text-center'>
							<h3>Você não tem tarefas arquivadas.</h3>
						</Col>
					</Row>
				) : (
					''
				)}
				<Row style={{ marginTop: 10 }}>
					{this.props.isLoading ? (
						<Col xs='12' className='text-center'>
							<Spinner bg='text-secondary' />
						</Col>
					) : (
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
							<CardColumns>
								{filedTask.map((task) => {
									return (
										<Task
											key={task._id}
											{...task}
											task={task}
											background='secondary'
											OnClickAction={ActionsDropdown}
											handleStatusChange={
												this.handleStatusChange
											}
										/>
									)
								})}
							</CardColumns>
						</Col>
					)}
				</Row>
			</React.Fragment>
		)
	}
}

Fileds.propTypes = {
	getTasks: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	editTask: PropTypes.func.isRequired,
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
		deleteTask: (task) => dispatch(deleteTask(task)),
		editTask: (task) => dispatch(editTask(task)),
		getTasks: () => dispatch(getTasks()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Fileds)
