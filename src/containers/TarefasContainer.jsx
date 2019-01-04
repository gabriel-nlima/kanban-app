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
	}
	componentDidMount() {
		this.getTarefas()
	}
	//Funções para obter as tarefas e gerenciar o status
	//get
	getTarefas() {
		this.props.setTarefas()
		console.log(this.props)
		// tarefas.map((tarefa) => {
		// 	if (tarefa.status === status.FAZER) {
		// 		tarefasAFazer.unshift(tarefa)
		// 	} else if (tarefa.status === status.FAZENDO) {
		// 		tarefasSendoFeitas.unshift(tarefa)
		// 	} else if (tarefa.status === status.CONCLUIDO) {
		// 		tarefasConcluidas.unshift(tarefa)
		// 	}
		// 	return this.setState({
		// 		tarefasAFazer,
		// 		tarefasSendoFeitas,
		// 		tarefasConcluidas,
		// 	})
		// })
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
		console.log(this.props.tarefas)
		// const {
		// 	tarefasAFazer,
		// 	tarefasSendoFeitas,
		// 	tarefasConcluidas,
		// } = this.getStatusTarefas(this.props.tarefas)
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
						<Tarefas {...tarefasAFazer} />
					</div>
					<div className='col-4 card-decks'>
						{/* <Tarefas {...tarefasSendoFeitas} /> */}
					</div>
					<div className='col-4 card-decks'>
						{' '}
						{/* <Tarefas {...tarefasConcluidas} /> */}
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
const mapDispatchToProps = {
	setTarefas: () => setTarefas(),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
