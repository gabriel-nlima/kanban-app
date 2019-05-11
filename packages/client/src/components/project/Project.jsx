import React from 'react'

import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const { Body, Title, Text } = Card

export const Project = () => {
	return (
		<Card bg='primary'>
			<Body className='text-center'>
				<Title> Projeto 1</Title>
				<Text>Descrição do projeto 1</Text>
				<Text>Adicionado em 11/05</Text>
				<Link to='/tasks' style={{ color: 'black' }}>
					Ver tarefas
				</Link>
			</Body>
		</Card>
	)
}

export default Project
