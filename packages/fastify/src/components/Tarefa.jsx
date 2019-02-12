import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Badge from 'react-bootstrap/Badge'

const Tarefa = ({ tarefa, acao, OnClickAction }) => {
	return (
		<Card.Body className='text-center'>
			<Card.Title>{tarefa.titulo}</Card.Title>
			<Card.Text className='text-justify'>{tarefa.conteudo}</Card.Text>
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
				<Link
					to={{ pathname: '/editar', state: { tarefa } }}
					className='btn btn-sm btn-light'
				>
					Editar{' '}
				</Link>
				<OnClickAction />
			</ButtonGroup>
		</Card.Body>
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
	acao: PropTypes.shape({
		text: PropTypes.string,
		btnBg: PropTypes.string,
	}).isRequired,
	onClickAction: PropTypes.func.isRequired,
}

export default Tarefa
