import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import * as status from '../utils/status'

const FormTask = ({ handleSubmit, handleChange, task }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='title'>Titulo</Form.Label>
					<Form.Control
						name='title'
						id='title'
						type='text'
						className='mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Titulo'
						data-testid='inputTitle'
						value={task.title || ''}
						maxLength='40'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='desc'>Descrição</Form.Label>
					<Form.Control
						as='textarea'
						rows='2'
						name='desc'
						id='desc'
						type='text'
						className='mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Descrição'
						maxLength='100'
						data-testid='inputDesc'
						value={task.desc || ''}
					/>
				</Form.Group>
			</Form.Row>
			{task._id ? (
				<Form.Row>
					<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
						<Form.Label htmlFor='selectStatus'>Status</Form.Label>
						<Form.Control
							as='select'
							id='selectStatus'
							name='status'
							onChange={handleChange}
							value={task.status}
						>
							<option value={status.TODO}>A FAZER</option>
							<option value={status.BEING_DONE}>FAZENDO</option>
							<option value={status.FINISHED}>CONCLUIDO</option>
							<option value={status.FILED}>ARQUIVADO</option>
						</Form.Control>
					</Form.Group>
				</Form.Row>
			) : (
				''
			)}

			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='tag1'>Tag 01</Form.Label>
					<Form.Control
						id='tag1'
						name='tag1'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Tag 01'
						value={task.tag1 || ''}
						maxLength='15'
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='tag2'>Tag 02</Form.Label>
					<Form.Control
						id='tag2'
						name='tag2'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Tag 02'
						value={task.tag2 || ''}
						maxLength='15'
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row className='text-right'>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Link
						to='/'
						className='btn btn-secondary'
						data-testid='btnBack'
					>
						Voltar
					</Link>
					<Button
						type='submit'
						style={{ marginLeft: 5 }}
						className='btn btn-primary'
					>
						Salvar tarefa
					</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	)
}

export default withRouter(FormTask)
