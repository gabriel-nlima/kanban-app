import React from 'react'
import PropTypes from 'prop-types'

const Tarefa = ({ tarefa, acao, onChangeStatus }) => {
	return (
		<div className='card-body'>
			<h5 className='card-title'>{tarefa.titulo}</h5>
			<p className='card-text'>{tarefa.conteudo}</p>
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
	tarefa: PropTypes.shape({
		titulo: PropTypes.string.isRequired,
		conteudo: PropTypes.string.isRequired,
		adicionadoEm: PropTypes.string,
		concluidoEm: PropTypes.string,
	}).isRequired,
	acao: PropTypes.string.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
}
export default Tarefa
