import React from 'react'
import PropTypes from 'prop-types'

const Tarefa = ({ tarefa, titulo, conteudo, data, acao, onChangeStatus }) => {
	console.log(tarefa)
	return (
		<div className='card-body'>
			<h5 className='card-title'>{titulo}</h5>
			<p className='card-text'>{conteudo}</p>
			<p className='card-text'>{data}</p>
			<button
				className={'btn btn-sm btn-secondary'}
				onClick={() => onChangeStatus(tarefa)}
			>
				{acao}
			</button>
		</div>
	)
}
Tarefa.propTypes = {
	titulo: PropTypes.string.isRequired,
	conteudo: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired,
}
export default Tarefa
