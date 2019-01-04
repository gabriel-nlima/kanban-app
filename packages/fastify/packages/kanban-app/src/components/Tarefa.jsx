import React from 'react'
import PropTypes from 'prop-types'

const Tarefa = ({ titulo, conteudo, data, status }) => {
	return (
		<div className='card-body'>
			<h5 className='card-title'>{titulo}</h5>
			<p className='card-text'>{conteudo}</p>
			<p className='card-text'>{data}</p>
			<button className={'btn btn-sm btn-secondary'}>Fazer</button>
		</div>
	)
}
Tarefa.propTypes = {
	titulo: PropTypes.string.isRequired,
	conteudo: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired,
}
export default Tarefa
