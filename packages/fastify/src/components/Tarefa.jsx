import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Tarefa = ({ tarefa, acao, onClickAction, props }) => {
	return (
		<div className='card-body text-center'>
			<h5 className='card-title'>{tarefa.titulo}</h5>
			<p className='card-text text-justify'>{tarefa.conteudo}</p>
			<p style={{ fontSize: 11 }} className='card-text text-left '>
				Adicionado em: {tarefa.adicionadoEm}
			</p>
			<p style={{ fontSize: 11 }} className='card-text text-left'>
				{tarefa.concluidoEm === undefined
					? ''
					: 'Concluido em: ' + tarefa.concluidoEm}
			</p>
			<p className='card-text text-center'>
				{tarefa.tag1 === undefined ? (
					''
				) : (
					<span
						className='badge badge-pill badge-light'
						style={{ marginRight: 5 }}
					>
						{tarefa.tag1}
					</span>
				)}
				{tarefa.tag2 === undefined ? (
					''
				) : (
					<span className='badge badge-pill badge-light'>
						{tarefa.tag2}
					</span>
				)}
			</p>

			<Link
				style={{ marginRight: 5 }}
				to={{ pathname: '/editar', state: { tarefa } }}
				className='btn btn-sm btn-light'
			>
				Editar{' '}
			</Link>
			<button
				className={'btn btn-sm ' + acao.btnBg}
				onClick={() => onClickAction(tarefa)}
			>
				{acao.text}
			</button>
		</div>
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
