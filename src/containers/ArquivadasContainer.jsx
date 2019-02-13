import React from 'react'
import Tarefas from '../components/Tarefas'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import * as status from '../utils/status'

import { Link } from 'react-router-dom'

import {
	getTarefas,
	deletaTarefa,
	editarTarefa,
} from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

/*
 *Recebe as tarefas da redux store, separa as que tem o status === ARQUIVADO
 *passa para os componentes <Tarefas/> para renderizar, junto com a função delete
 */

export class ArquivadasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.actionsDropdown = this.actionsDropdown.bind(this)
		this.handleStatusChange = this.handleStatusChange.bind(this)
	}

	componentDidMount() {
		if (this.props.tarefas.length === 0) {
			this.props.getTarefas()
		}
	}
	filtraArquivadas(tarefa) {
		if (tarefa.status === status.ARQUIVADO) {
			return true
		} else {
			return false
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
		return (
			<DropdownButton
				variant='primary'
				size='sm'
				id='actions'
				title='Ações'
			>
				{status.acoes.map((acao) => {
					let texto = ''
					if (acao === status.FAZER) {
						texto = 'A Fazer'
					} else if (acao === status.FAZENDO) {
						texto = 'Fazer'
					} else if (acao === status.CONCLUIDO) {
						texto = 'Concluir'
					} else if (acao === status.ARQUIVADO) {
						return ''
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

	render() {
		const tarefasArquivadas = this.props.tarefas.filter(
			this.filtraArquivadas
		)
		const badgeMargin = { marginLeft: 6 }

		return (
			<React.Fragment>
				<Row>
					<Col xs={6}>
						<h4 className='text-secondary'>
							Tarefas arquivadas:
							<span
								data-testid='badge'
								style={badgeMargin}
								className='badge badge-pill badge-secondary'
							>
								{tarefasArquivadas.length}
							</span>
						</h4>
					</Col>
					<Col xs={6} className='text-right'>
						<Link className='btn btn-primary' to='/'>
							Voltar para o Quadro Kanban
						</Link>
					</Col>
				</Row>
				{this.props.error !== false ? (
					<Row>
						<Col xs={12}>
							<Alert variant='danger'>
								Algo deu errado,{' '}
								<Link
									className='alert-link'
									to='/arquivadas'
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
				{tarefasArquivadas.length === 0 ? (
					<Row style={{ marginTop: 10 }}>
						<Col xs='12' className='text-center'>
							<h3>Você não tem tarefas arquivadas.</h3>
						</Col>
					</Row>
				) : (
					''
				)}
				<Row style={{ marginTop: 10 }}>
					{this.props.isLoading ? (
						<Col xs='12' className='text-center'>
							<Spinner bg='text-secondary' />
						</Col>
					) : (
						<CardColumns>
							<Tarefas
								tarefas={tarefasArquivadas}
								background='secondary'
								acao={{ text: 'Deletar', btnBg: 'danger' }}
								OnClickAction={this.actionsDropdown}
							/>
						</CardColumns>
					)}
				</Row>
			</React.Fragment>
		)
	}
}

ArquivadasContainer.propTypes = {
	getTarefas: PropTypes.func.isRequired,
	deletaTarefa: PropTypes.func.isRequired,
	editarTarefa: PropTypes.func.isRequired,
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
		deletaTarefa: (tarefa) => dispatch(deletaTarefa(tarefa)),
		editarTarefa: (tarefa) => dispatch(editarTarefa(tarefa)),
		getTarefas: () => dispatch(getTarefas()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArquivadasContainer)
