import React from 'react'
import Task from '../components/Task'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import * as status from '../utils/status'

import { Link } from 'react-router-dom'

import { getTasks, deleteTask, editTask } from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

export class Fileds extends React.Component {
	constructor(props) {
		super(props)
		this.actionsDropdown = this.actionsDropdown.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
	}

	componentDidMount() {
		if (this.props.tasks.length === 0) {
			this.props.getTasks()
		}
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
	actionsDropdown({ task }) {
		return (
			<DropdownButton
				variant='primary'
				size='sm'
				id='actions'
				title='Ações'
			>
				{status.actions.map((action) => {
					let text = ''
					if (action === status.TODO) {
						text = 'A Fazer'
					} else if (action === status.BEING_DONE) {
						text = 'Fazer'
					} else if (action === status.FINISHED) {
						text = 'Concluir'
					} else if (action === status.FILED) {
						return ''
					} else {
						text = 'Deletar'
					}
					return (
						<Dropdown.Item
							key={action}
							onClick={() =>
								this.handleStatusChange(task, action)
							}
						>
							{text}
						</Dropdown.Item>
					)
				})}
			</DropdownButton>
		)
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
				{this.props.error !== false ? (
					<Row>
						<Col xs={12}>
							<Alert variant='danger'>
								Algo deu errado,{' '}
								<Link
									className='alert-link'
									to='/fileds'
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
											OnClickAction={this.actionsDropdown}
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
