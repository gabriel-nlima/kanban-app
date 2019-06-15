import React from 'react'
import EditForm from '../../components/Forms/FormProject'
import { Back } from '../../components/common/Buttons'

import { withRouter } from 'react-router-dom'

import { handleChange, isInvalid } from '../utils'

import { connect } from 'react-redux'
import { editProject } from '../../redux/project'
import { getActiveProject } from '../../redux/currentState'

class EditProject extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitProject = this.submitProject.bind(this)
		this.BackBtn = this.BackBtn.bind(this)
	}

	async componentDidMount() {
		if (this.props.history.action !== 'PUSH' && localStorage.ap) {
			await this.props.getActiveProject()
		}
		this.setState({ project: this.props.activeProject })
	}

	validate = () => {
		return isInvalid(this.state.project, 'name')
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

	BackBtn = () => (
		<Back onClick={() => this.props.history.push('/projectInfos')} />
	)

	render() {
		return (
			<EditForm
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
