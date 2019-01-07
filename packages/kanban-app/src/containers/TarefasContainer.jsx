import React from 'react'
import Tarefas from '../components/Tarefas'
import * as status from './status'
import { setTarefas, trocaStatus } from '../actions/actions'

import { connect } from 'react-redux'
class TarefasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefas: [],
		}
		this.getStatusTarefas = this.getStatusTarefas.bind(this)
		this.setNovoStatus = this.setNovoStatus.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
	}
	componentDidMount() {
		this.getTarefas()
		this.getStatusTarefas(this.props.tarefas)
	}
	//Funções para obter as tarefas e gerenciar o status
	//get
	getTarefas() {
		this.props.setTarefas()
	}
	getStatusTarefas(tarefas) {
		const tarefasAFazer = []
		const tarefasSendoFeitas = []
		const tarefasConcluidas = []
		tarefas.map((tarefa) => {
			if (tarefa.length === 0) {
				return []
			}
			if (tarefa.status === status.FAZER) {
				tarefasAFazer.unshift(tarefa)
			} else if (tarefa.status === status.FAZENDO) {
				tarefasSendoFeitas.unshift(tarefa)
			} else if (tarefa.status === status.CONCLUIDO) {
				tarefasConcluidas.unshift(tarefa)
			}
			return { tarefasAFazer, tarefasSendoFeitas, tarefasConcluidas }
		})

		return { tarefasAFazer, tarefasSendoFeitas, tarefasConcluidas }
	}

	setNovoStatus(tarefa, novoStatus) {
		tarefa = {
			...tarefa,
			status: novoStatus,
		}
		this.props.trocaStatus(tarefa)
	}
	handleStatusChange(tarefa) {
		if (tarefa.status === status.FAZER) {
			this.setNovoStatus(tarefa, status.FAZENDO)
		} else if (tarefa.status === status.FAZENDO) {
			this.setNovoStatus(tarefa, status.CONCLUIDO)
		}
	}
	render() {
		const {
			tarefasAFazer,
			tarefasSendoFeitas,
			tarefasConcluidas,
		} = this.getStatusTarefas(this.props.tarefas)
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-4'>
						<h3 className='text-primary'>A FAZER</h3>
					</div>
					<div className='col-4'>
						<h3 className='text-warning'>FAZENDO</h3>
					</div>
					<div className='col-4'>
						<h3 className='text-success'>FEITO</h3>
					</div>
				</div>
				<div className='row'>
					<div className='col-4 card-decks'>
						<Tarefas
							key='a_fazer'
							tarefas={tarefasAFazer}
							background='bg-primary'
							acao='Fazer'
							onChangeStatus={this.handleStatusChange}
						/>
					</div>
					<div className='col-4 card-decks'>
						<Tarefas
							tarefas={tarefasSendoFeitas}
							background='bg-warning'
							acao='Concluir'
							onChangeStatus={this.handleStatusChange}
						/>
					</div>
					<div className='col-4 card-decks'>
						<Tarefas
							tarefas={tarefasConcluidas}
							background='bg-success'
							acao='Arquivar'
							onChangeStatus={this.handleStatusChange}
						/>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		tarefas: state.tarefas,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setTarefas: () => dispatch(setTarefas()),
		trocaStatus: (tarefa) => dispatch(trocaStatus(tarefa)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
