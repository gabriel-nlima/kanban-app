import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import * as status from '../utils/status'

const FormTarefa = ({ handleSubmit, handleChange, tarefa }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='titulo'>Titulo</Form.Label>
					<Form.Control
						name='titulo'
						id='titulo'
						type='text'
						className='mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Titulo'
						data-testid='inputTitulo'
						value={tarefa.titulo || ''}
						maxLength='35'
						required
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Form.Label htmlFor='descricao'>Descrição</Form.Label>
					<Form.Control
						as='textarea'
						rows='2'
						name='conteudo'
						id='descricao'
						type='text'
						className='mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Descrição'
						maxLength='75'
						data-testid='inputConteudo'
						value={tarefa.conteudo || ''}
					/>
				</Form.Group>
			</Form.Row>
			{tarefa._id ? (
				<Form.Row>
					<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
						<Form.Label htmlFor='selectStatus'>Status</Form.Label>
						<Form.Control
							as='select'
							id='selectStatus'
							name='status'
							onChange={handleChange}
							value={tarefa.status}
						>
							<option value={status.FAZER}>A FAZER</option>
							<option value={status.FAZENDO}>FAZENDO</option>
							<option value={status.CONCLUIDO}>CONCLUIDO</option>
							<option value={status.ARQUIVADO}>ARQUIVADO</option>
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
						value={tarefa.tag1 || ''}
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
						value={tarefa.tag2 || ''}
						maxLength='15'
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row className='text-right'>
				<Form.Group className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Link
						to='/'
						className='btn btn-secondary'
						data-testid='btnVoltar'
					>
						Voltar
					</Link>
					<Button
						type='submit'
						style={{ marginLeft: 5 }}
						className='btn btn-primary'
					>
						Salvar Tarefa
					</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	)
}

export default withRouter(FormTarefa)
