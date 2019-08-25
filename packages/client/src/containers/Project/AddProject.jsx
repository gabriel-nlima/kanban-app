import React from 'react'
import AddForm from '../../components/Forms/FormProject'
import { Back } from '../../components/common/Buttons'

import { handleChange, isInvalid } from '../utils'

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

	validate = () => {
		return isInvalid(this.state.project, 'name')
	}

	handleInputChange(e) {
		this.setState({ project: handleChange(e, this.state.project) })
	}

	submitProject(e) {
		this.props.addProject(this.state.project)
		this.setState({ project: {} })
		this.props.history.push('/home')
		e.preventDefault()
	}

	BackBtn = () => <Back onClick={() => this.props.history.push('/home')} />

	render() {
		return (
			<AddForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitProject}
				project={this.state.project}
				BackBtn={this.BackBtn}
				validate={this.validate}
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
