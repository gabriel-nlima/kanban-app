import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'

const Tarefas = ({ tarefas, props }) =>
	tarefas.map((tarefa) => {
		return (
			<div
				key={tarefa.id}
				className={'card w-auto h-auto bg-success'}
				style={{ marginBottom: 5 }}
			>
				<Tarefa {...tarefa} />
			</div>
		)
	})
Tarefas.propTypes = {
	tarefas: PropTypes.array.isRequired,
}
export default Tarefas
