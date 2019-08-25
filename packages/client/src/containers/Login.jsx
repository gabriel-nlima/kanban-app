import React from 'react'
import FormLogin from '../components/Forms/FormLogin'
import Axios from '../api'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import { handleChange, isInvalid } from './utils'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			error: { isError: false, message: '' },
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.login = this.login.bind(this)
	}

	validate = () => {
		return (
			isInvalid(this.state.user, 'email') ||
			isInvalid(this.state.user, 'pwd')
		)
	}

	handleInputChange(e) {
		this.setState({ user: handleChange(e, this.state.user) })
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
				<FormLogin
					handleChange={this.handleInputChange}
					handleSubmit={this.login}
					user={this.state.user}
					validate={this.validate}
				/>
			</>
		)
	}
}
export default Login
