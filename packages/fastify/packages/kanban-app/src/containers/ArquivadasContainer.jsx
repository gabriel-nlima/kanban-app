import React from 'react'
import Tarefas from '../components/Tarefas'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'
import Alert from 'react-bootstrap/Alert'
import * as status from './status'

import { Link } from 'react-router-dom'

import { getAllTarefas, deletaTarefa } from '../redux/actions/actions'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

/*
 *Recebe as tarefas da redux store, separa as que tem o status === ARQUIVADO
 *passa para os componentes <Tarefas/> para renderizar, junto com a função delete
 */

export class ArquivadasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.deletaTarefa = this.deletaTarefa.bind(this)
	}

	componentDidMount() {
		//this.props.getTarefas()
	}
	filtraArquivadas(tarefa) {
		if (tarefa.status === status.ARQUIVADO) {
			return true
		} else {
			return false
		}
	}

	deletaTarefa(tarefa) {
		this.props.deletaTarefa(tarefa)
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
				<Row style={{ marginTop: 10 }}>
					<CardColumns>
						{this.props.isLoading &&
						tarefasArquivadas.length === 0 ? (
							<Spinner bg='text-secondary' />
						) : (
							<Tarefas
								tarefas={tarefasArquivadas}
								background='secondary'
								acao={{ text: 'Deletar', btnBg: 'danger' }}
								onClickAction={this.deletaTarefa}
							/>
						)}
					</CardColumns>
				</Row>
			</React.Fragment>
		)
	}
}

ArquivadasContainer.propTypes = {
	getTarefas: PropTypes.func.isRequired,
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
		deletaTarefa: (tarefa) => dispatch(deletaTarefa(tarefa)),
		getTarefas: () => dispatch(getAllTarefas()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArquivadasContainer)
