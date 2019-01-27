import React from 'react'
import Tarefas from '../components/Tarefas'
import * as status from './status'

import { Link } from 'react-router-dom'

import { getAllTarefas, trocaStatus } from '../redux/actions/actions'
import { connect } from 'react-redux'
import AddTarefaContainer from './AddTarefaContainer'

import PropTypes from 'prop-types'

/*
 *Recebe as tarefas da redux store, separa por status e os
 *passa para os componentes <Tarefas/> para renderizar.
 */

class TarefasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefas: [],
		}
		this.getStatusTarefas = this.getStatusTarefas.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
	}
	componentDidMount() {
		this.props.getTarefas()
		this.getStatusTarefas(this.props.tarefas)
	}

	getStatusTarefas(tarefas) {
		const tarefasAFazer = []
		const tarefasSendoFeitas = []
		const tarefasConcluidas = []
		const tarefasArquivadas = []
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
			} else if (tarefa.status === status.ARQUIVADO) {
				tarefasArquivadas.unshift(tarefa)
			}
			return { tarefasAFazer, tarefasSendoFeitas, tarefasConcluidas }
		})

		return {
			tarefasAFazer,
			tarefasSendoFeitas,
			tarefasConcluidas,
			tarefasArquivadas,
		}
	}

	//Passa o novo status da terafa para o action creator, de acordo com o status atual
	//fazer>fazendo>concluido>arquivado>deletado
	handleStatusChange(tarefa) {
		let novoStatus = []
		if (tarefa.status === status.FAZER) {
			novoStatus = status.FAZENDO
		} else if (tarefa.status === status.FAZENDO) {
			novoStatus = status.CONCLUIDO
		} else if (tarefa.status === status.CONCLUIDO) {
			novoStatus = status.ARQUIVADO
		}

		this.props.trocaStatus(tarefa, novoStatus)
	}
	render() {
		const {
			tarefasAFazer,
			tarefasSendoFeitas,
			tarefasConcluidas,
			tarefasArquivadas,
		} = this.getStatusTarefas(this.props.tarefas)

		const badgeMargin = { marginLeft: 6 }

		return (
			<React.Fragment>
				<AddTarefaContainer />
				<div className='row text-left'>
					<div className='col-12 col-md-6 col-lg-6 col-xl-6'>
						<h5 className='text-muted'>
							<Link to='/arquivadas'>ARQUIVADAS:</Link>
							<span
								style={badgeMargin}
								className='badge badge-pill badge-secondary'
							>
								{tarefasArquivadas.length}
							</span>
						</h5>
					</div>
				</div>
				<div className='row'>
					<div className='col-6 col-md-4 col-lg-4 col-xl-4'>
						<h3 className='text-center text-info'>
							A FAZER
							<span
								style={badgeMargin}
								className='badge badge-pill badge-info'
							>
								{tarefasAFazer.length}
							</span>
						</h3>
						<Tarefas
							key='a_fazer'
							tarefas={tarefasAFazer}
							background='text-white bg-info'
							acao={{ text: 'Fazer', btnBg: 'btn-secondary' }}
							onClickAction={this.handleStatusChange}
						/>
					</div>
					<div className='col-6 col-md-4 col-lg-4 col-xl-4'>
						<h3 className='text-center text-warning'>
							FAZENDO
							<span
								style={badgeMargin}
								className='badge badge-pill badge-info'
							>
								{tarefasSendoFeitas.length}
							</span>
						</h3>
						<Tarefas
							tarefas={tarefasSendoFeitas}
							background='bg-warning'
							acao={{ text: 'Concluir', btnBg: 'btn-secondary' }}
							onClickAction={this.handleStatusChange}
						/>
					</div>
					<div className='col-12 col-md-4 col-lg-4 col-xl-4'>
						<h3 className='text-center text-success'>
							FEITO
							<span
								style={badgeMargin}
								className='badge badge-pill badge-info'
							>
								{tarefasConcluidas.length}
							</span>
						</h3>
						<Tarefas
							tarefas={tarefasConcluidas}
							background='bg-success'
							acao={{ text: 'Arquivar', btnBg: 'btn-secondary' }}
							onClickAction={this.handleStatusChange}
						/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

TarefasContainer.propTypes = {
	getTarefas: PropTypes.func.isRequired,
	trocaStatus: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
	return {
		tarefas: state.tarefas,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getTarefas: () => dispatch(getAllTarefas()),
		trocaStatus: (tarefa, novoStatus) =>
			dispatch(trocaStatus(tarefa, novoStatus)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
