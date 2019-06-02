import React from 'react'

import Project from '../components/project/Project'
import { CustomAlert } from '../components/CustomAlert'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

import { Link, withRouter } from 'react-router-dom'

import { getProjects, setActiveProject } from '../redux/project'
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
			state: { project },
		})
	}

	render() {
		const { projects } = this.props
		return (
			<>
				{this.props.isError ? <CustomAlert Link={Link} /> : <></>}
				{projects.length === 0 ? (
					<Row style={{ marginTop: 10 }}>
						<Col xs='12' className='text-center'>
							<h3>Você não tem projetos</h3>
						</Col>
					</Row>
				) : (
					<></>
				)}
				<Row style={{ marginTop: 10 }}>
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
		isError: state.currentState.isError,
		isLoading: state.currentState.isLoading,
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
