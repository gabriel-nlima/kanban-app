import React from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

/**
 * Receber o projeto via react-router state
 * Receber o id projeto via react-router state, e buscar no servidor
 * Ao clicar em "Detalhes", enviar action com id do projeto para buscar no servidor, e guardar o active project no redux store
 */

const { Body, Text, Header } = Card

export class ProjectInfos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: {},
		}
	}

	componentDidMount() {
		if (this.props.location.state) {
			const { project } = this.props.location.state
			this.setState({ project })
		} else this.props.history.push('/')
	}

	render() {
		const { name, desc } = this.state.project
		return (
			<>
				<Row style={{ marginTop: 10 }}>
					<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						<Card>
							<Header>
								<h2>Nome do projeto: {' ' + name || '-'}</h2>
							</Header>
							<Body>
								<Text>
									{desc
										? 'Descrição: ' + desc
										: 'Sem descrição'}
								</Text>
							</Body>
						</Card>
					</Col>
				</Row>
				<Row style={{ marginTop: 10 }}>
					<Col xs={12} sm={12} md={12} lg={12} xl={12}>
						<Card>
							<Header>
								<h2 className='d-flex justify-content-between'>
									<span>Tarefas</span>
									<Button>Adiconar tarefa</Button>
								</h2>
							</Header>
							<Body>
								<Text>TODO</Text>
							</Body>
						</Card>
					</Col>
				</Row>
			</>
		)
	}
}

export default ProjectInfos
