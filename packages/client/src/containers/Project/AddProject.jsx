import React from 'react'
import AddForm from '../../components/Forms/FormProject'

import { handleChange } from '../utils'

import { withRouter, Link } from 'react-router-dom'

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

	BackBtn = () => (
		<Link to='/' className='btn btn-secondary'>
			Voltar
		</Link>
	)

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
