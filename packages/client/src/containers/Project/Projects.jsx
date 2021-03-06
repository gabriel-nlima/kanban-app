import React from 'react'

import Project from '../../components/Project'
import { CustomAlert } from '../../components/common/CustomAlert'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

import { Link, withRouter } from 'react-router-dom'

import { getProjects } from '../../redux/project'
import { setActiveProject } from '../../redux/currentState'
import { connect } from 'react-redux'

export class Projects extends React.Component {
	constructor(props) {
		super(props)
		this.state = { projects: [] }
		this.setProject = this.setProject.bind(this)
	}

	componentDidMount() {
		this.props.getProjects()
	}

	async setProject(project) {
		await this.props.setActiveProject(project)
		this.props.history.push({
			pathname: '/projectInfos',
		})
	}

	render() {
		const { projects } = this.props
		return (
			<>
				{this.props.isError ? (
					<CustomAlert Link={Link} message={this.props.message} />
				) : (
					<></>
				)}
				{projects.length === 0 ? (
					<Row className='margin-top-minor'>
						<Col xs='12' className='text-center'>
							<h3>Você não tem projetos</h3>
						</Col>
					</Row>
				) : (
					<></>
				)}
				<Row className='margin-top-minor'>
					<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						<CardColumns>
							{projects.map((project) => {
								return (
									<Project
										key={project._id}
										{...project}
										project={project}
										setProject={this.setProject}
									/>
								)
							})}
						</CardColumns>
					</Col>
				</Row>
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		projects: state.project.projects,
		isError: state.current.isError,
		message: state.current.message,
		isLoading: state.current.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getProjects: () => dispatch(getProjects()),
		setActiveProject: (project) => dispatch(setActiveProject(project)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Projects)
)
