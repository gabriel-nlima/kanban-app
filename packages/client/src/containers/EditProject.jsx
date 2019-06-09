import React from 'react'
import EditForm from '../components/project/Form'

import { withRouter } from 'react-router-dom'

import { handleChange } from '../utils'

import { connect } from 'react-redux'
import { editProject } from '../redux/project'
import { getActiveProject } from '../redux/currentState'

class EditProject extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitProject = this.submitProject.bind(this)
	}

	async componentDidMount() {
		if (this.props.history.action !== 'PUSH' && localStorage.ap) {
			await this.props.getActiveProject()
		}
		this.setState({ project: this.props.activeProject })
	}

	handleInputChange(e) {
		this.setState({ project: handleChange(e, this.state.project) })
	}
	submitProject(e) {
		this.props.editProject(this.state.project)
		this.props.history.push({
			pathname: '/projectInfos',
		})
		e.preventDefault()
	}

	render() {
		return (
			<EditForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitProject}
				project={this.state.project}
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
		editProject: (project) => dispatch(editProject(project)),
		getActiveProject: () => dispatch(getActiveProject()),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditProject)
)
