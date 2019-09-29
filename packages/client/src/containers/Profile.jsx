import React from 'react'
import Axios from '../api'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { FaAngleLeft, FaPen } from 'react-icons/fa'

import Spinner from '../components/common/Spinner'
import { CustomAlert } from '../components/common/CustomAlert'

import { withRouter, Link } from 'react-router-dom'

const { Body, Text, Header } = Card

export class ProjectInfos extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: undefined }

		this.getUser = this.getUser.bind(this)
	}
	getUser() {
		if (localStorage.getItem('kanbanauthtoken') !== null) {
			Axios.get('/api/users/me')
				.then((res) => {
					this.setState({ user: res.data.user })
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
	componentDidMount() {
		this.getUser()
	}

	componentWillUnmount() {
		this.setState({ user: undefined })
	}

	handleName = (projectName) => {
		this.setState({ projectName })
	}

	render() {
		const { user } = this.state
		return (
			<>
				{this.props.isLoading ? (
					<Spinner />
				) : this.props.isError ? (
					<CustomAlert Link={Link} message={this.props.message} />
				) : (
					user && (
						<>
							<Row style={{ marginTop: 10 }}>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<Card>
										<Header className='d-flex justify-content-between'>
											<h2>
												<Button
													variant='secondary'
													onClick={() => {
														this.props.history.push(
															'/home'
														)
													}}
												>
													<FaAngleLeft size='1.5em' />
												</Button>
												Bem vindo, {user.name}
											</h2>
											<h2>
												<Button
													variant='secondary'
													onClick={() => {}}
													style={{ margin: 5 }}
												>
													<FaPen size='1.2em' />
												</Button>
											</h2>
										</Header>
										<Body>
											<Text>
												Tarefas concluidas: 0 [TODO]
											</Text>
										</Body>
									</Card>
								</Col>
							</Row>
							<Row style={{ marginTop: 10 }}>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<Card></Card>
								</Col>
							</Row>
						</>
					)
				)}
			</>
		)
	}
}

export default withRouter(ProjectInfos)
