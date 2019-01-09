import React from 'react'
import PropTypes from 'prop-types'
import Tarefa from './Tarefa'

const Tarefas = ({ tarefas, background, acao, onChangeStatus, props }) =>
	tarefas.map((tarefa, index) => {
		return (
			<div
				key={index}
				className={'card w-auto h-auto ' + background}
				style={{ marginBottom: 5 }}
			>
				<Tarefa
					{...tarefa}
					acao={acao}
					tarefa={tarefa}
					onChangeStatus={onChangeStatus}
				/>
			</div>
		)
	})
Tarefas.propTypes = {
	tarefas: PropTypes.array.isRequired,
}
export default Tarefas