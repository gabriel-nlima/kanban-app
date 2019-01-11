import React from 'react'
import Tarefas from '../components/Tarefas'
import * as status from './status'

import { deletaTarefa } from '../redux/actions/actions'
import { connect } from 'react-redux'

class ArquivadasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.deletaTarefa = this.deletaTarefa.bind(this)
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
					<div className='col-12'>
						<h4 className='text-secondary'>
							Tarefas arquivadas:{' '}
							<span
								style={badgeMargin}
								className='badge badge-pill badge-secondary'
							>
								{tarefasArquivadas.length}
							</span>
						</h4>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
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

function mapStateToProps(state) {
	return {
		tarefas: state.tarefas,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		deletaTarefa: (tarefa) => dispatch(deletaTarefa(tarefa)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArquivadasContainer)
