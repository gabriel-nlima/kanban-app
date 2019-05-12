import React from 'react'
import EditForm from '../components/project/Form'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { editProject } from '../redux/project'

class EditProject extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitProject = this.submitProject.bind(this)
	}

	componentDidMount() {
		if (this.props.history.action !== 'PUSH') {
			this.props.history.push('/')
		} else if (this.props.location.state) {
			const { project } = this.props.location.state
			this.setState({ project })
		} else if (this.props.activeProject) {
			this.setState({ project: this.props.activeProject })
		}
	}

	handleInputChange(e) {
		const project = Object.assign({}, this.state.project)
		project[e.target.name] = e.target.value
		this.setState({ project })
	}
	submitProject(e) {
		this.props.editProject(this.state.project)
		this.props.history.push({
			pathname: '/projectInfos',
			state: {
				project: this.state.project,
			},
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

function mapStateToProps(state) {
	return {
		activeProject: state.project.activeProject,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		editProject: (project) => dispatch(editProject(project)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditProject)
)
