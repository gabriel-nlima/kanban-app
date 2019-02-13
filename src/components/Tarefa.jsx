import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { ARQUIVADO } from '../utils/status'
import Badge from 'react-bootstrap/Badge'

const onDragStart = (e, tarefa) => {
	e.dropEffect = 'move'
	const tarefaJson = JSON.stringify(tarefa)
	e.dataTransfer.setData('tarefa', tarefaJson)
	e.dataTransfer.effectAllowed = 'move'
}

const Tarefa = ({ tarefa, background, OnClickAction }) => {
	return (
		<Card
			bg={background}
			key={tarefa._id}
			draggable={tarefa.status === ARQUIVADO ? false : true}
			onDragStart={(e) => onDragStart(e, tarefa)}
			className={'card w-100 h-auto'}
			style={{ marginBottom: 5 }}
		>
			<Card.Body className='text-center'>
				<Card.Title>{tarefa.titulo}</Card.Title>
				<Card.Text className='text-justify'>
					{tarefa.conteudo}
				</Card.Text>
				<Card.Text style={{ fontSize: 11 }} className='text-left '>
					Adicionado em: {tarefa.adicionadoEm}
				</Card.Text>
				<Card.Text style={{ fontSize: 11 }} className='text-left'>
					{tarefa.concluidoEm === undefined
						? ''
						: 'Concluido em: ' + tarefa.concluidoEm}
				</Card.Text>
				<Card.Text className='text-center'>
					{tarefa.tag1 === undefined ? (
						''
					) : (
						<Badge pill variant='light' style={{ marginRight: 5 }}>
							{tarefa.tag1}
						</Badge>
					)}
					{tarefa.tag2 === undefined ? (
						''
					) : (
						<Badge pill variant='light'>
							{tarefa.tag2}
						</Badge>
					)}
				</Card.Text>
				<ButtonGroup size='sm'>
					<Button
						href='/editar'
						variant='light'
						size='sm'
						as={Link}
						type='button'
						to={{ pathname: '/editar', state: { tarefa } }}
					>
						Editar{' '}
					</Button>
					<OnClickAction tarefa={tarefa} />
				</ButtonGroup>
			</Card.Body>
		</Card>
	)
}
Tarefa.propTypes = {
	tarefa: PropTypes.shape({
		titulo: PropTypes.string.isRequired,
		conteudo: PropTypes.string,
		tag1: PropTypes.string,
		tag2: PropTypes.string,
		adicionadoEm: PropTypes.string.isRequired,
		concluidoEm: PropTypes.string,
	}).isRequired,
	OnClickAction: PropTypes.func.isRequired,
}

export default Tarefa
