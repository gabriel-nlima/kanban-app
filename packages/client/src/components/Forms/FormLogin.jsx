import React from 'react'
import Form from 'react-bootstrap/Form'

import { Save } from '../common/Buttons'

const FormLogin = ({ handleChange, handleSubmit, user, validate }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='authId'>
						E-mail ou nome de usuário
					</Form.Label>
					<Form.Control
						name='authId'
						type='text'
						onChange={handleChange}
						value={user.authId || ''}
						className='mb-2 mr-sm-2'
						placeholder='Digite seu e-mail'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='pwd'>Senha</Form.Label>
					<Form.Control
						name='pwd'
						type='password'
						onChange={handleChange}
						value={user.pwd || ''}
						className='mb-2 mr-sm-2'
						placeholder='Digite sua senha'
						maxLength='16'
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
	)
}

export default FormLogin
