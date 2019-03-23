import React from 'react'
import Tarefa from '../components/Tarefa'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import * as status from '../utils/status'

import { Link } from 'react-router-dom'

import {
	getTarefas,
	editarTarefa,
	deletaTarefa,
} from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

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

	handleStatusChange(tarefa, novoStatus) {
		tarefa = {
			...tarefa,
			status: novoStatus,
			ultimoStatus: tarefa.status,
		}
		if (novoStatus === status.DELETADO) {
			this.props.deletaTarefa(tarefa)
		} else {
			this.props.editarTarefa(tarefa)
		}
	}
	actionsDropdown({ tarefa }) {
		//TO DO: Adicionar a opção excluir
		return (
			<DropdownButton size='sm' id='actions' title='Ações'>
				{status.acoes.map((acao) => {
					let texto = ''
					if (acao === status.FAZER) {
						texto = 'A Fazer'
					} else if (acao === status.FAZENDO) {
						texto = 'Fazer'
					} else if (acao === status.CONCLUIDO) {
						texto = 'Concluir'
					} else if (acao === status.ARQUIVADO) {
						texto = 'Arquivar'
					} else {
						texto = 'Deletar'
					}
					return (
						<Dropdown.Item
							key={acao}
							onClick={() =>
								this.handleStatusChange(tarefa, acao)
							}
						>
							{texto}
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
	onDrop = async (e, status) => {
		let tarefa = JSON.parse(e.dataTransfer.getData('tarefa'))
		await this.handleStatusChange(tarefa, status)
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
						<Button
							variant='primary'
							type='button'
							href='/adicionar'
							as={Link}
							to='/adicionar'
							disabled={this.props.error !== false ? true : false}
						>
							Adicionar nova tarefa
						</Button>
					</Col>
				</Row>
				{this.props.error !== false ? (
					<Row>
						<Col xs={12}>
							<Alert variant='danger'>
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
						onDrop={(e) => this.onDrop(e, status.FAZER)}
					>
						<h3 className='text-center text-info'>
							A FAZER
							<Badge pill variant='info' style={badgeMargin}>
								{tarefasAFazer.length}
							</Badge>
						</h3>
						{tarefasAFazer.length === 0 ? (
							<h4 className='text-center'>
								Sem tarefas a fazer.
							</h4>
						) : (
							''
						)}
						{this.props.isLoading ? (
							<Spinner bg='text-info' />
						) : (
							tarefasAFazer.map((tarefa) => {
								return (
									<Tarefa
										key={tarefa._id}
										background='info'
										{...tarefa}
										tarefa={tarefa}
										OnClickAction={this.actionsDropdown}
									/>
								)
							})
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
						{tarefasSendoFeitas.length === 0 ? (
							<h4 className='text-center'>
								Sem tarefas em andamento.
							</h4>
						) : (
							''
						)}
						{this.props.isLoading ? (
							<Spinner bg='text-warning' />
						) : (
							tarefasSendoFeitas.map((tarefa) => {
								return (
									<Tarefa
										key={tarefa._id}
										background='warning'
										{...tarefa}
										tarefa={tarefa}
										OnClickAction={this.actionsDropdown}
									/>
								)
							})
						)}
					</Col>
					<Col
						xs={12}
						sm={12}
						md={4}
						lg={4}
						xl={4}
						onDragOver={(e) => this.onDragOver(e)}
						onDrop={(e) => this.onDrop(e, status.CONCLUIDO)}
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
						{tarefasConcluidas.length === 0 ? (
							<h4 className='text-center'>
								Nenhuma tarefa concluida.
							</h4>
						) : (
							''
						)}
						{this.props.isLoading &&
						tarefasConcluidas.length === 0 ? (
							<Spinner bg='text-success' />
						) : (
							tarefasConcluidas.map((tarefa) => {
								return (
									<Tarefa
										key={tarefa._id}
										background='success'
										{...tarefa}
										tarefa={tarefa}
										OnClickAction={this.actionsDropdown}
									/>
								)
							})
						)}
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

TarefasContainer.propTypes = {
	getTarefas: PropTypes.func.isRequired,
	editarTarefa: PropTypes.func.isRequired,
	deletaTarefa: PropTypes.func.isRequired,
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
		getTarefas: () => dispatch(getTarefas()),
		editarTarefa: (tarefa) => dispatch(editarTarefa(tarefa)),
		deletaTarefa: (tarefa) => dispatch(deletaTarefa(tarefa)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TarefasContainer)
