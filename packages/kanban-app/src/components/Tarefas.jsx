import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'

const Tarefas = ({ tarefas, props }) =>
	tarefas.map((tarefa) => {
		return <Tarefa key={tarefa.titulo} {...tarefa} />
	})
Tarefas.propTypes = {
	tarefas: PropTypes.array.isRequired,
}
export default Tarefas
