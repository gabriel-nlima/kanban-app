import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FaAngleLeft, FaPen, FaTrash } from 'react-icons/fa'

import Tasks from './Tasks'
import Spinner from '../components/Spinner'

import { connect } from 'react-redux'
import { setActiveProject, getActiveProject } from '../redux/project'
import { getTasks } from '../redux/task'

import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const { Body, Text, Header } = Card

export class ProjectInfos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
	}

	componentDidMount() {
		if (this.props.history.action !== 'PUSH') {
			this.props.history.push('/')
		}
	}

	render() {
		const project = this.props.activeProject
		console.log(this.props)
		return (
			<>
				<Row style={{ marginTop: 10 }}>
					<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						{this.props.isLoading ? (
							<Spinner />
						) : (
							<Card>
								<Header className='d-flex justify-content-between'>
									<h2>
										<Button
											variant='secondary'
											onClick={() =>
												this.props.history.push('/')
											}
										>
											<FaAngleLeft size='1.5em' />
										</Button>
										{'  ' + project.name}
									</h2>
									<h2>
										<Button
											variant='secondary'
											onClick={() =>
												this.props.history.push({
													pathname: '/editProject',
												})
											}
											style={{ margin: 5 }}
										>
											<FaPen size='1.2em' />
										</Button>
										<Button
											variant='danger'
											onClick={() =>
												this.props.history.push('/')
											}
										>
											<FaTrash size='1.2em' />
										</Button>
									</h2>
								</Header>
								<Body>
									<Text>
										{project.desc
											? project.desc
											: 'Sem descrição'}
									</Text>
								</Body>
							</Card>
						)}
					</Col>
				</Row>
				<Row style={{ marginTop: 10 }}>
					<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						{this.props.isLoading ? (
							<Spinner />
						) : (
							<Card>
								<Header>
									<h2 className='d-flex justify-content-between'>
										<span>Tarefas</span>
									</h2>
								</Header>
								<Body>
									<Tasks />
								</Body>
							</Card>
						)}
					</Col>
				</Row>
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		activeProject: state.project.activeProject,
		error: state.project.error,
		isLoading: state.project.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setActiveProject: (project) => dispatch(setActiveProject(project)),
		getActiveProject: () => dispatch(getActiveProject()),
		getTasks: () => dispatch(getTasks()),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProjectInfos)
)
