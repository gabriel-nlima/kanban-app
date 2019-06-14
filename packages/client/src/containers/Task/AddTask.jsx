import React from 'react'
import AddTaskForm from '../../components/Forms/FormTask'

import { handleChange } from '../utils'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { addTask } from '../../redux/task'

class AddTask extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			task: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTask = this.submitTask.bind(this)
	}

	handleInputChange(e) {
		this.setState({ task: handleChange(e, this.state.task) })
	}
	submitTask(e) {
		if (this.props.activeProject) {
			const { _id } = this.props.activeProject
			let { task } = this.state
			task = { ...task, project_id: _id }
			this.props.addTask(task)
		}
		this.setState({ task: {} })

		this.props.handleModal()
		e.preventDefault()
	}

	render() {
		return (
			<AddTaskForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitTask}
				task={this.state.task}
				handleModal={this.props.handleModal}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		activeProject: state.current.activeProject,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (task) => dispatch(addTask(task)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AddTask)
)
