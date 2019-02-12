import React from 'react'
import Tarefas from '../components/Tarefas'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import * as status from './status'

import { Link } from 'react-router-dom'

import { getAllTarefas, editarTarefa } from '../redux/actions/actions'
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
		this.actionsDropdown = this.actionsDropdown.bind(this)
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
	handleStatusChange(tarefa, novoStatus) {
		console.log(tarefa)
		tarefa = {
			...tarefa,
			status: novoStatus,
			ultimoStatus: tarefa.status,
		}
		console.log(tarefa)
		this.props.editarTarefa(tarefa)
	}
	actionsDropdown({ tarefa }) {
		//TO DO: Adicionar a opção excluir
		return (
			<DropdownButton size='sm' id='actions' title='Ações'>
				{status.AllStatus.map((status) => {
					return (
						<Dropdown.Item
							key={status}
							onClick={() =>
								this.handleStatusChange(tarefa, status)
							}
						>
							{status}
						</Dropdown.Item>
					)
				})}
			</DropdownButton>
		)
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

		return (
			<React.Fragment>
				<Row className='text-left'>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						<h5 className='text-muted'>
							<Link
								to='/arquivadas'
								className='btn btn-secondary'
							>
								ARQUIVADAS{' '}
								<Badge pill variant='info' style={badgeMargin}>
									{tarefasArquivadas.length}
								</Badge>
							</Link>
						</h5>
					</Col>
					<Col
						xs={6}
						sm={6}
						md={6}
						lg={6}
						xl={6}
						className='text-right'
					>
						<Link to='/adicionar' className='btn btn-primary'>
							Adicionar nova tarefa
						</Link>
					</Col>
				</Row>
				{this.props.error !== false ? (
					<Row>
						<Col xs={12}>
							<Alert value='danger'>
								Algo deu errado,{' '}
								<Link
									className='alert-link'
									to='/'
									onClick={() => window.location.reload()}
								>
									recarregue a página.
								</Link>
							</Alert>
						</Col>
					</Row>
				) : (
					''
				)}
				<Row>
					<Col
						xs={6}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e)}
					>
						<h3 className='text-center text-info'>
							A FAZER
							<Badge pill variant='info' style={badgeMargin}>
								{tarefasAFazer.length}
							</Badge>
						</h3>
						{this.props.isLoading && tarefasAFazer.length === 0 ? (
							<Spinner bg='text-info' />
						) : (
							<Tarefas
								tarefas={tarefasAFazer}
								background='info'
								acao={{ text: 'Fazer', btnBg: 'secondary' }}
								OnClickAction={this.actionsDropdown}
							/>
						)}
					</Col>
					<Col
						xs={6}
						sm={6}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.FAZENDO)}
					>
						<h3 className='text-center text-warning'>
							FAZENDO
							<Badge pill variant='warning' style={badgeMargin}>
								{tarefasSendoFeitas.length}
							</Badge>
						</h3>
						{this.props.isLoading &&
						tarefasSendoFeitas.length === 0 ? (
							<Spinner bg='text-warning' />
						) : (
							<Tarefas
								tarefas={tarefasSendoFeitas}
								background='warning'
								acao={{
									text: 'Concluir',
									btnBg: 'secondary',
								}}
								OnClickAction={this.actionsDropdown}
							/>
						)}
					</Col>
					<Col
						xs={12}
						sm={12}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e)}
					>
						<h3 className='text-center text-success'>
							FEITO
							<Badge
								pill
								variant='success'
								style={badgeMargin}
								className='badge badge-pill badge-success'
							>
								{tarefasConcluidas.length}
							</Badge>
						</h3>
						{this.props.isLoading &&
						tarefasConcluidas.length === 0 ? (
							<Spinner bg='text-success' />
						) : (
							<Tarefas
								tarefas={tarefasConcluidas}
								background='success'
								acao={{
									text: 'Arquivar',
									btnBg: 'secondary',
								}}
								OnClickAction={this.actionsDropdown}
							/>
						)}
					</Col>
				</Row>
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
		editarTarefa: (tarefa) => dispatch(editarTarefa(tarefa)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
