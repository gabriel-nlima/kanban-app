import React from 'react'
import Form from 'react-bootstrap/Form'

import { Save } from '../common/Buttons'

const FormLogin = ({ handleChange, handleSubmit, user, validate }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='username'>Nome de usuário</Form.Label>
					<Form.Control
						name='username'
						type='text'
						onChange={handleChange}
						value={user.username || ''}
						className='mb-2 mr-sm-2'
						placeholder='Digite seu nome de usuário'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='name'>Nome</Form.Label>
					<Form.Control
						name='name'
						type='text'
						onChange={handleChange}
						value={user.name || ''}
						className='mb-2 mr-sm-2'
						placeholder='Digite seu nome'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='email'>E-mail</Form.Label>
					<Form.Control
						name='email'
						type='text'
						onChange={handleChange}
						value={user.email || ''}
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
						maxLength='100'
						data-testid='inputPwd'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12'>
					<Form.Label htmlFor='pwd2'>Confirmar senha</Form.Label>
					<Form.Control
						name='pwd2'
						type='password'
						onChange={handleChange}
						value={user.pwd2 || ''}
						className='mb-2 mr-sm-2'
						placeholder='Confirme sua senha'
						data-testid='inputPwd'
						required
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row className='text-right'>
				<Form.Group className='col-12'>
					<Save text='Registrar' disabled={validate()} />
				</Form.Group>
			</Form.Row>
		</Form>
	)
}

export default FormLogin
