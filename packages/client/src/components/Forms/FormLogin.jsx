import React from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Save } from '../common/Buttons'

const { Body, Header } = Card

const FormLogin = ({ handleChange, handleSubmit, user, validate }) => {
	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={12} sm={12} md={10} lg={8} xl={6}>
				<Card border='dark'>
					<Header>Login</Header>
					<Body>
						<Form onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='title'>
										E-mail
									</Form.Label>
									<Form.Control
										name='email'
										id='email'
										type='text'
										onChange={handleChange}
										value={user.email || ''}
										className='mb-2 mr-sm-2'
										placeholder='Digite seu e-mail'
										maxLength='40'
										required
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='desc'>
										Senha
									</Form.Label>
									<Form.Control
										name='pwd'
										id='pwd'
										type='password'
										onChange={handleChange}
										value={user.pwd || ''}
										className='mb-2 mr-sm-2'
										placeholder='Digite sua senha'
										maxLength='100'
										data-testid='inputPwd'
										required
									/>
								</Form.Group>
							</Form.Row>

							<Form.Row className='text-right'>
								<Form.Group className='col-12'>
									<Save text='Entrar' disabled={validate()} />
								</Form.Group>
							</Form.Row>
						</Form>
					</Body>
				</Card>
			</Col>
		</Row>
	)
}

export default FormLogin
