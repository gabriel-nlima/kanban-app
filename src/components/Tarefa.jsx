import React from 'react'
import PropTypes from 'prop-types'

const Tarefa = ({ tarefa, acao, onClickAction }) => {
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
		conteudo: PropTypes.string.isRequired,
		adicionadoEm: PropTypes.string.isRequired,
		concluidoEm: PropTypes.string,
	}).isRequired,
	acao: PropTypes.object.isRequired,
	onClickAction: PropTypes.func.isRequired,
}
export default Tarefa
