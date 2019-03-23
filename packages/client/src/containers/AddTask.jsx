import React from 'react'
import AddTaskForm from '../components/FormTask'
import { addTask } from '../redux/actions/actions'

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
		this.props.addTask(this.state.task)
		this.setState({ task: [] })
		this.props.history.push('/')
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
		tasks: state,
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
