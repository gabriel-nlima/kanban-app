import React from 'react'

import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Save } from '../common/Buttons'

const { Body, Header } = Card

const ProjectForm = ({
	handleSubmit,
	handleChange,
	project,
	BackBtn,
	validate,
}) => {
	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={12} sm={12} md={10} lg={8} xl={6}>
				<Card border='dark'>
					<Header>Projeto</Header>
					<Body>
						<Form onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='title'>
										Nome
									</Form.Label>
									<Form.Control
										name='name'
										id='name'
										type='text'
										onChange={handleChange}
										value={project.name || ''}
										className='mb-2 mr-sm-2'
										placeholder='Nome'
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
										onChange={handleChange}
										value={project.desc || ''}
										className='mb-2 mr-sm-2'
										placeholder='Descrição'
										maxLength='100'
										data-testid='inputDesc'
									/>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group className='col-12'>
									<Form.Label htmlFor='tag1'>
										Tag 01
									</Form.Label>
									<Form.Control
										id='tag1'
										name='tag1'
										type='text'
										onChange={handleChange}
										value={project.tag1 || ''}
										className='form-control mb-2 mr-sm-2'
										placeholder='Tag 01'
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
										onChange={handleChange}
										value={project.tag2 || ''}
										className='form-control mb-2 mr-sm-2'
										placeholder='Tag 02'
										maxLength='15'
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row className='text-right'>
								<Form.Group className='col-12'>
									<BackBtn />
									<Save
										text='Salvar projeto'
										disabled={validate()}
									/>
								</Form.Group>
							</Form.Row>
						</Form>
					</Body>
				</Card>
			</Col>
		</Row>
	)
}

export default withRouter(ProjectForm)
