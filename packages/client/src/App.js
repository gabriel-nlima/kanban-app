import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

import Project from './components/project/Project'
import './css/index.css'

const { Body, Title, Text, Header } = Card

const App = () => {
	return (
		<>
			<Jumbotron>
				<h3>Projetos</h3>
				<p>
					Gerencie seus projetos, listados abaixo. Ou acompanhe o
					andamento de suas ultimas atividades.
				</p>
				<h4>Resumo das atividades:</h4>
				<CardDeck>
					<Card border='dark'>
						<Header>Projetos</Header>
						<Body>
							<Title>Andamento dos seus projetos</Title>
							<Text>Total de projetos:</Text>
							<Text>Total de projetos concluidos:</Text>
						</Body>
					</Card>
					<Card border='dark'>
						<Header>Atividade recente</Header>
						<Body>
							<Title>Andamento dos atividades recentes</Title>
							<Text>Total de tarefas:</Text>
							<Text>Total de concluidas:</Text>
							<Text>Ultimas tarefas adicionadas:</Text>
							<Text>
								Ultimas tarefas concluidas: TODO:Project Name /
								Task title
							</Text>
						</Body>
					</Card>
				</CardDeck>
				<p style={{ marginTop: 10 }}>
					<Button
						variant='primary'
						type='button'
						href='/addTask'
						as={Link}
						to='/addProject'
					>
						Adicionar projeto
					</Button>
				</p>
			</Jumbotron>
			<CardDeck>
				<Project />
				<Project />
				<Project />
				<Project />
			</CardDeck>
		</>
	)
}
export default App
