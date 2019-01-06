import React from 'react'
import Tarefas from '../components/Tarefas'
import * as status from './status'
import { setTarefas } from '../actions/actions'

import { connect } from 'react-redux'
class TarefasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefas: [],
			tarefasAFazer: [],
			tarefasSendoFeitas: [],
			tarefasConcluidas: [],
		}
		this.props.setTarefas()
	}
	componentDidMount() {
		this.getTarefas()
		this.setState({ tarefasAFazer: this.props.tarefasAFazer })
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
			if (tarefa.lenght === 0) {
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
	}
	render() {
		const {
			tarefasAFazer,
			tarefasSendoFeitas,
			tarefasConcluidas,
		} = this.props
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
						/>
					</div>
					<div className='col-4 card-decks'>
						<Tarefas
							tarefas={tarefasSendoFeitas}
							background='bg-warning'
							acao='Concluir'
						/>
					</div>
					<div className='col-4 card-decks'>
						<Tarefas
							tarefas={tarefasConcluidas}
							background='bg-success'
							acao='Arquivar'
						/>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		tarefasAFazer: state.tarefasAFazer,
		tarefasSendoFeitas: state.tarefasSendoFeitas,
		tarefasConcluidas: state.tarefasConcluidas,
	}
}
const mapDispatchToProps = (dispatch) => {
	return { setTarefas: () => dispatch(setTarefas()) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
