import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const { Body, Title, Text } = Card

export const Project = ({ project, setProject }) => {
	return (
		<Card bg='primary'>
			<Body className='text-center'>
				<Title> {project.name}</Title>
				<Text>{project.desc}</Text>
				<Text>Adicionado em 11/05</Text>
				<Button variant='dark' onClick={() => setProject(project)}>
					Detalhes
				</Button>
			</Body>
		</Card>
	)
}

export default Project
