import React from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import * as status from '../../utils/status'

const FormTask = ({
	handleSubmit,
	handleChange,
	task,
	isEditing,
	handleModal,
}) => {
	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={12} sm={12} md={10} lg={8} xl={6}>
				<Card border='dark'>
					<Card.Header>
						{!isEditing
							? 'Adicionar tarefa'
							: 'Editando tarefa: ' + task.title}
					</Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='title'>
										Titulo
									</Form.Label>
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
								<Form.Group className='col-12'>
									<Form.Label htmlFor='desc'>
										Descrição
									</Form.Label>
									<Form.Control
										as='textarea'
										rows='2'
										name='desc'
										id='desc'
										type='text'
										className='mb-2 mr-sm-2'
										onChange={handleChange}
										placeholder='Descrição'
										maxLength='120'
										data-testid='inputDesc'
										value={task.desc || ''}
									/>
								</Form.Group>
							</Form.Row>
							{task._id ? (
								<Form.Row>
									<Form.Group className='col-12'>
										<Form.Label htmlFor='selectStatus'>
											Status
										</Form.Label>
										<Form.Control
											as='select'
											id='selectStatus'
											name='status'
											onChange={handleChange}
											value={task.status}
										>
											<option value={status.TODO}>
												A FAZER
											</option>
											<option value={status.BEING_DONE}>
												FAZENDO
											</option>
											<option value={status.FINISHED}>
												CONCLUIDO
											</option>
											<option value={status.FILED}>
												ARQUIVADO
											</option>
										</Form.Control>
									</Form.Group>
								</Form.Row>
							) : (
								''
							)}

							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='tag1'>
										Tag 01
									</Form.Label>
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
								<Form.Group className='col-12 '>
									<Form.Label htmlFor='tag2'>
										Tag 02
									</Form.Label>
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
								<Form.Group className='col-12'>
									<Button
										className='btn btn-secondary'
										onClick={handleModal}
									>
										Fechar
									</Button>
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
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default withRouter(FormTask)
