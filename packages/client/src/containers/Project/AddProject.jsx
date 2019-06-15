import React from 'react'
import AddForm from '../../components/Forms/FormProject'
import { Back } from '../../components/common/Buttons'

import { handleChange } from '../utils'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { addProject } from '../../redux/project'

class AddProject extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitProject = this.submitProject.bind(this)
		this.BackBtn = this.BackBtn.bind(this)
	}

	handleInputChange(e) {
		this.setState({ project: handleChange(e, this.state.project) })
	}

	submitProject(e) {
		this.props.addProject(this.state.project)
		this.setState({ project: {} })
		this.props.history.push('/')
		e.preventDefault()
	}

	BackBtn = () => <Back onClick={() => this.props.history.push('/')} />

	render() {
		return (
			<AddForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitProject}
				project={this.state.project}
				BackBtn={this.BackBtn}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.project.projects,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addProject: (project) => dispatch(addProject(project)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AddProject)
)
