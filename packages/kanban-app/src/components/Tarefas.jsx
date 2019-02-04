import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'
import { CONCLUIDO, ARQUIVADO } from '../containers/status'

const onDragStart = (e, tarefa) => {
	e.dropEffect = 'move'
	const tarefaJson = JSON.stringify(tarefa)
	e.dataTransfer.setData('tarefa', tarefaJson)
	e.dataTransfer.effectAllowed = 'move'
}
const Tarefas = ({ tarefas, background, acao, onClickAction }) =>
	tarefas.map((tarefa) => {
		return (
			<div
				key={tarefa._id}
				draggable={
					tarefa.status === CONCLUIDO || tarefa.status === ARQUIVADO
						? false
						: true
				}
				onDragStart={(e) => onDragStart(e, tarefa)}
				className={'card w-100 h-auto ' + background}
				style={{ marginBottom: 5 }}
			>
				<Tarefa
					{...tarefa}
					acao={acao}
					tarefa={tarefa}
					onClickAction={onClickAction}
				/>
			</div>
		)
	})
Tarefas.propTypes = {
	tarefas: PropTypes.array.isRequired,
	background: PropTypes.string.isRequired,
	acao: PropTypes.shape({
		text: PropTypes.string,
		btnBg: PropTypes.string,
	}).isRequired,
	onClickAction: PropTypes.func.isRequired,
}
export default Tarefas
