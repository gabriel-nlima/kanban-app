import React from 'react'
import Tarefas from '../components/Tarefas'
import Spinner from '../components/Spinner'
import * as status from './status'

import { Link } from 'react-router-dom'

import { getAllTarefas, trocaStatus } from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

/*
 *Recebe as tarefas da redux store, separa por status e os
 *passa para os componentes <Tarefas/> para renderizar.
 */

export class TarefasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefas: [],
		}
		this.getStatusTarefas = this.getStatusTarefas.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
		this.onDragOver = this.onDragOver.bind(this)
		this.onDrop = this.onDrop.bind(this)
	}
	componentDidMount() {
		//this.props.getTarefas()
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
				tarefasAFazer.push(tarefa)
			} else if (tarefa.status === status.FAZENDO) {
				tarefasSendoFeitas.push(tarefa)
			} else if (tarefa.status === status.CONCLUIDO) {
				tarefasConcluidas.push(tarefa)
			} else if (tarefa.status === status.ARQUIVADO) {
				tarefasArquivadas.push(tarefa)
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
	onDragOver = (e) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}
	onDrop = async (e) => {
		let tarefa = JSON.parse(e.dataTransfer.getData('tarefa'))
		await this.handleStatusChange(tarefa)
	}
	render() {
		const {
			tarefasAFazer,
			tarefasSendoFeitas,
			tarefasConcluidas,
			tarefasArquivadas,
		} = this.getStatusTarefas(this.props.tarefas)

		const badgeMargin = { marginLeft: 6 }

		// if (this.props.error !== false) {
		// 	throw this.props.error
		// }
		return (
			<React.Fragment>
				<div className='row text-left'>
					<div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
						<h5 className='text-muted'>
							<Link
								to='/arquivadas'
								className='btn btn-secondary'
							>
								ARQUIVADAS{' '}
								<span
									style={badgeMargin}
									className='badge badge-pill badge-info'
								>
									{tarefasArquivadas.length}
								</span>
							</Link>
						</h5>
					</div>
					<div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right'>
						<Link to='/adicionar' className='btn btn-primary'>
							Adicionar nova tarefa
						</Link>
					</div>
				</div>
				{this.props.error !== false ? (
					<div className='row'>
						<div className='col-12'>
							<div className='alert alert-danger' role='alert'>
								Algo deu errado,{' '}
								<Link
									className='alert-link'
									to='/'
									onClick={() => window.location.reload()}
								>
									recarregue a página.
								</Link>
							</div>
						</div>
					</div>
				) : (
					''
				)}
				<div className='row'>
					<div
						className='col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4'
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e)}
					>
						<h3 className='text-center text-info'>
							A FAZER
							<span
								style={badgeMargin}
								className='badge badge-pill badge-info'
							>
								{tarefasAFazer.length}
							</span>
						</h3>
						{this.props.isLoading && tarefasAFazer.length === 0 ? (
							<Spinner bg='text-info' />
						) : (
							<Tarefas
								tarefas={tarefasAFazer}
								background='text-white bg-info'
								acao={{ text: 'Fazer', btnBg: 'btn-secondary' }}
								onClickAction={this.handleStatusChange}
							/>
						)}
					</div>
					<div
						className='col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4'
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.FAZENDO)}
					>
						<h3 className='text-center text-warning'>
							FAZENDO
							<span
								style={badgeMargin}
								className='badge badge-pill badge-warning'
							>
								{tarefasSendoFeitas.length}
							</span>
						</h3>
						{this.props.isLoading &&
						tarefasSendoFeitas.length === 0 ? (
							<Spinner bg='text-warning' />
						) : (
							<Tarefas
								tarefas={tarefasSendoFeitas}
								background='bg-warning'
								acao={{
									text: 'Concluir',
									btnBg: 'btn-secondary',
								}}
								onClickAction={this.handleStatusChange}
							/>
						)}
					</div>
					<div
						className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e)}
					>
						<h3 className='text-center text-success'>
							FEITO
							<span
								style={badgeMargin}
								className='badge badge-pill badge-success'
							>
								{tarefasConcluidas.length}
							</span>
						</h3>
						{this.props.isLoading &&
						tarefasConcluidas.length === 0 ? (
							<Spinner bg='text-success' />
						) : (
							<Tarefas
								tarefas={tarefasConcluidas}
								background='bg-success'
								acao={{
									text: 'Arquivar',
									btnBg: 'btn-secondary',
								}}
								onClickAction={this.handleStatusChange}
							/>
						)}
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
		error: state.error,
		isLoading: state.isLoading,
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
