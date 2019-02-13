import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'
import { ARQUIVADO } from '../utils/status'
import Card from 'react-bootstrap/Card'

const onDragStart = (e, tarefa) => {
	e.dropEffect = 'move'
	const tarefaJson = JSON.stringify(tarefa)
	e.dataTransfer.setData('tarefa', tarefaJson)
	e.dataTransfer.effectAllowed = 'move'
}
const Tarefas = ({ tarefas, background, OnClickAction }) =>
	tarefas.map((tarefa) => {
		return (
			<Card
				bg={background}
				key={tarefa._id}
				draggable={tarefa.status === ARQUIVADO ? false : true}
				onDragStart={(e) => onDragStart(e, tarefa)}
				className={'card w-100 h-auto'}
				style={{ marginBottom: 5 }}
			>
				<Tarefa
					{...tarefa}
					tarefa={tarefa}
					OnClickAction={OnClickAction}
				/>
			</Card>
		)
	})
Tarefas.propTypes = {
	tarefas: PropTypes.array.isRequired,
	background: PropTypes.string.isRequired,
	OnClickAction: PropTypes.func.isRequired,
}
export default Tarefas
