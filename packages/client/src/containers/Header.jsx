import React from 'react'
import { withRouter } from 'react-router-dom'
import Axios from '../api'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from '../components/common/Spinner'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: undefined,
		}
		this.logout = this.logout.bind(this)
		this.goToAdminArea = this.goToAdminArea.bind(this)
		this.goToProfile = this.goToProfile.bind(this)
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

	componentDidUpdate() {
		if (!this.state.user) {
			this.getUser()
		}
	}
	componentWillUnmount() {
		if (localStorage.getItem('kanbanauthtoken') === null) {
			this.setState({ user: undefined })
		}
	}
	goToAdminArea() {
		if (this.state.user && this.state.user.role === 'admin') {
			this.props.history.push('/admin')
		}
	}
	goToProfile() {
		this.props.history.push('/profile')
	}
	logout() {
		localStorage.removeItem('kanbanauthtoken')
		this.setState({ user: undefined })
		this.props.history.push('/')
	}

	render() {
		const { user } = this.state
		return (
			<header style={{ marginTop: '5px' }}>
				<Row>
					<Col className='text-left' xs={6}>
						<h3>Quadro Kanban</h3>
					</Col>
					{localStorage.getItem('kanbanauthtoken') !== null && (
						<Col className='text-right' xs={6}>
							{!user ? (
								<Spinner bg='dark' />
							) : (
								<DropdownButton
									id='dropdown-user'
									title={user.name}
									alignRight
								>
									<Dropdown.Header>
										Gerenciamento
									</Dropdown.Header>
									{user.role === 'admin' && (
										<Dropdown.Item
											onClick={this.goToAdminArea}
										>
											Administração
										</Dropdown.Item>
									)}
									<Dropdown.Item onClick={this.goToProfile}>
										Meus dados
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={this.logout}>
										Sair
									</Dropdown.Item>
								</DropdownButton>
							)}
						</Col>
					)}
				</Row>
				<Row>
					<Col>
						<h4 className='text-muted'>
							Crie e acompanhe projetos e suas respectivas tarefas
						</h4>
					</Col>
				</Row>
			</header>
		)
	}
}

export default withRouter(Header)
