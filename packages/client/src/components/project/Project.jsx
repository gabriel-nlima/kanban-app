import React from 'react'

import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const { Body, Title, Text } = Card

export const Project = ({ project }) => {
	return (
		<Card bg='primary'>
			<Body className='text-center'>
				<Title> {project.name}</Title>
				<Text>{project.desc}</Text>
				<Text>Adicionado em 11/05</Text>
				<Link
					to={{ pathname: '/projectInfos', state: { project } }}
					style={{ color: 'black' }}
				>
					Detalhes
				</Link>
			</Body>
		</Card>
	)
}

export default Project
