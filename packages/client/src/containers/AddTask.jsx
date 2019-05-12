import React from 'react'
import AddTaskForm from '../components/task/FormTask'
import { addTask } from '../redux/task'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class AddTask extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			task: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTask = this.submitTask.bind(this)
	}

	componentDidMount() {}

	handleInputChange(e) {
		const task = Object.assign({}, this.state.task)
		task[e.target.name] = e.target.value
		this.setState({ task })
	}
	submitTask(e) {
		if (this.props.activeProject) {
			const { _id } = this.props.activeProject
			let { task } = this.state
			task = { ...task, project_id: _id }
			this.props.addTask(task)
		}
		this.setState({ task: [] })
		this.props.history.push('/projectInfos')
		e.preventDefault()
	}

	render() {
		return (
			<AddTaskForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitTask}
				task={this.state.task}
			/>
		)
	}
}

AddTask.propTypes = {
	addTask: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		activeProject: state.project.activeProject,
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
