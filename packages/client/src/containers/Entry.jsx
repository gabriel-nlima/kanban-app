import React from 'react'
import FormLogin from '../components/Forms/FormLogin'
import FormRegister from '../components/Forms/FormRegister'
import Axios from '../api'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import { handleChange, isInvalid } from './utils'

const { Body, Header } = Card

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			error: { isError: false, message: '' },
			currentTab: 'login',
		}
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		this.clear = this.clear.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.validateLogin = this.validateLogin.bind(this)
		this.validateRegister = this.validateRegister.bind(this)
		this.closeError = this.closeError.bind(this)
	}

	validateLogin = () => {
		return (
			isInvalid(this.state.user, 'email') ||
			isInvalid(this.state.user, 'pwd')
		)
	}

	validateRegister = () => {
		const { pwd, pwd2 } = this.state.user
		return (
			isInvalid(this.state.user, 'email') ||
			isInvalid(this.state.user, 'pwd') ||
			isInvalid(this.state.user, 'pwd2') ||
			pwd !== pwd2
		)
	}

	clear() {
		this.setState({ user: {} })
	}

	handleInputChange(e) {
		this.setState({ user: handleChange(e, this.state.user) })
	}
	handleTabChange(tab) {
		this.clear()
		this.setState({ currentTab: tab })
	}

	closeError() {
		this.setState({ error: { isError: false, message: '' } })
	}
	componentWillUnmount() {
		this.setState({ user: {}, error: { isError: false, message: '' } })
	}

	login(e) {
		e.preventDefault()
		Axios.post('/api/login', this.state.user)
			.then((res) => {
				const { token } = res.data
				localStorage.setItem('kanbanauthtoken', token)
				this.props.history.push('/home')
			})
			.catch((err) => {
				if (err.response) {
					const { message } = err.response.data
					this.setState({ error: { isError: true, message } })
				}
			})
	}

	register(e) {
		e.preventDefault()
		Axios.post('/api/register', this.state.user)
			.then((res) => {
				const { token } = res.data
				localStorage.setItem('kanbanauthtoken', token)
				this.props.history.push('/home')
			})
			.catch((err) => {
				if (err.response) {
					const { message } = err.response.data
					this.setState({ error: { isError: true, message } })
				}
			})
	}

	render() {
		const { isError, message } = this.state.error
		return (
			<>
				{isError && (
					<Row>
						<Col xs={12}>
							<Alert
								variant='danger'
								dismissible
								onClose={() => this.closeError()}
							>
								{message}
							</Alert>
						</Col>
					</Row>
				)}
				<Row className='d-flex justify-content-center'>
					<Col xs={12} sm={12} md={10} lg={8} xl={6}>
						<Tab.Container
							activeKey={this.state.currentTab}
							defaultActiveKey={this.state.currentTab}
							onSelect={this.handleTabChange}
						>
							<Card border='dark'>
								<Header>
									<Nav
										fill
										justify
										variant='tabs'
										activeKey={this.state.currentTab}
										defaultActiveKey={this.state.currentTab}
									>
										<Nav.Item>
											<Nav.Link eventKey='login'>
												Login
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey='register'>
												Registrar
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Header>
								<Body>
									<Tab.Content>
										<Tab.Pane eventKey='login'>
											<FormLogin
												handleChange={
													this.handleInputChange
												}
												handleSubmit={this.login}
												user={this.state.user}
												validate={this.validateLogin}
											/>
										</Tab.Pane>
										<Tab.Pane eventKey='register'>
											<FormRegister
												handleChange={
													this.handleInputChange
												}
												handleSubmit={this.register}
												user={this.state.user}
												validate={this.validateRegister}
											/>
										</Tab.Pane>
									</Tab.Content>
								</Body>
							</Card>
						</Tab.Container>
					</Col>
				</Row>
			</>
		)
	}
}
export default Login
