import React from 'react'
import AddForm from '../components/project/Form'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

class AddProject extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitproject = this.submitproject.bind(this)
	}

	componentDidMount() {}

	handleInputChange(e) {
		const project = Object.assign({}, this.state.project)
		project[e.target.name] = e.target.value
		this.setState({ project })
	}
	submitproject(e) {
		//this.props.addProject(this.state.project)
		this.setState({ project: [] })
		this.props.history.push('/')
		e.preventDefault()
	}

	render() {
		return (
			<AddForm
				handleChange={this.handleInputChange}
				handleSubmit={this.submitproject}
				project={this.state.project}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		projects: state,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AddProject)
)
