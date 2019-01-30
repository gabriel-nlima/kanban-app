import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'
import { CONCLUIDO } from '../containers/status'

const onDragStart = (e, tarefa) => {
	e.dropEffect = 'move'
	const tarefaJson = JSON.stringify(tarefa)
	e.dataTransfer.setData('tarefa', tarefaJson)
}
const Tarefas = ({ tarefas, background, acao, onClickAction }) =>
	tarefas.map((tarefa, index) => {
		return (
			<div
				key={index}
				draggable={tarefa.status === CONCLUIDO ? false : true}
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
