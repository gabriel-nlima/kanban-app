import React from 'react'
import Tarefas from '../components/Tarefas'
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
				<div className='row'>
					<div className='col-6'>
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
					</div>
					<div className='col-6 text-right'>
						<Link className='btn btn-primary' to='/'>
							Voltar para o Quadro Kanban
						</Link>
					</div>
				</div>
				<div className='row' style={{ marginTop: 10 }}>
					<div className='col-12 card-columns'>
						<Tarefas
							tarefas={tarefasArquivadas}
							background='bg-secondary'
							acao={{ text: 'Deletar', btnBg: 'btn-danger' }}
							onClickAction={this.deletaTarefa}
						/>
					</div>
				</div>
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
