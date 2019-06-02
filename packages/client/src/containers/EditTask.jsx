import React from 'react'
import EditTaskForm from '../components/task/FormTask'
import { editTask } from '../redux/task'
import * as status from '../utils/status'
import { handleChange } from '../utils'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

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
		if (this.props.location.state) {
			const { task } = this.props.location.state
			this.setState({ task })
		} else this.props.history.push('/')
	}

	handleInputChange(e) {
		this.setState({ task: handleChange(e, this.state.task) })
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
		this.props.history.push('/projectInfos')
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

const mapStateToProps = (state) => {
	return {
		tasks: state.task.tasks,
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
