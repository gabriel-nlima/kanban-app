import React from 'react'
import EditTaskForm from '../components/task/FormTask'
import { editTask } from '../redux/actions/actions'
import * as status from '../utils/status'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

export class EditTask extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			task: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTask = this.submitTask.bind(this)
	}

	componentDidMount() {
		const { task } = this.props.location.state
		this.setState({ task })
	}

	handleInputChange(e) {
		const task = Object.assign({}, this.state.task)
		task[e.target.name] = e.target.value
		this.setState({ task })
	}

	submitTask(e) {
		let { task } = this.state
		if (task.status === status.FINISHED) {
			const finishedIn = new Date()
			task = {
				...task,
				finishedIn: finishedIn.toLocaleString(),
			}
		} else if (task.status === status.FILED) {
			task = { ...task }
		} else {
			task = {
				...task,
				finishedIn: '',
			}
		}
		this.props.editTask(task)
		this.props.history.push('/')
		e.preventDefault()
	}

	render() {
		return (
			<React.Fragment>
				<EditTaskForm
					handleChange={this.handleInputChange}
					handleSubmit={this.submitTask}
					task={this.state.task}
					isEditing={true}
				/>
			</React.Fragment>
		)
	}
}

EditTask.propTypes = {
	editTask: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		tasks: state,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (task) => dispatch(editTask(task)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditTask)
)
