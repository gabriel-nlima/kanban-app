import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'

import { FaAngleLeft, FaPen, FaTrash } from 'react-icons/fa'

import Tasks from './Tasks'
import Fileds from './Fileds'

import Spinner from '../components/Spinner'

import { connect } from 'react-redux'
import {
	setActiveProject,
	unsetActiveProject,
	getActiveProject,
} from '../redux/currentState'
import { getProjectTasks } from '../redux/task'

import { withRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import { deleteProject } from '../redux/project'

const { Body, Text, Header } = Card

export class ProjectInfos extends React.Component {
	async componentDidMount() {
		if (this.props.history.action !== 'PUSH' && localStorage.ap) {
			await this.props.getActiveProject()
		}
	}

	popover = (
		<Popover id='popover-basic' title='Deletar projeto?'>
			Todas as tarefas também serão deletadas. <b>Deletar mesmo assim?</b>
			<br />
			<Button
				variant='danger'
				onClick={() => {
					this.props.deleteProject(this.props.activeProject)
					this.props.history.push('/')
				}}
			>
				Sim
			</Button>
		</Popover>
	)

	render() {
		const project = this.props.activeProject
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
											onClick={() => {
												this.props.unsetActiveProject()
												this.props.history.push('/')
											}}
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
										<OverlayTrigger
											trigger='click'
											placement='bottom'
											overlay={this.popover}
										>
											<Button variant='danger'>
												<FaTrash size='1.2em' />
											</Button>
										</OverlayTrigger>
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
									<BrowserRouter basename='/projectInfos'>
										<Switch>
											<Route
												path='/'
												exact
												component={Tasks}
											/>
											<Route
												path='/fileds'
												exact
												component={Fileds}
											/>
										</Switch>
									</BrowserRouter>
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
		activeProject: state.current.activeProject,
		isError: state.current.isError,
		isLoading: state.current.isLoading,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setActiveProject: (project) => dispatch(setActiveProject(project)),
		getActiveProject: () => dispatch(getActiveProject()),
		unsetActiveProject: () => dispatch(unsetActiveProject()),
		getProjectTasks: () => dispatch(getProjectTasks()),
		deleteProject: (project) => dispatch(deleteProject(project)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProjectInfos)
)
