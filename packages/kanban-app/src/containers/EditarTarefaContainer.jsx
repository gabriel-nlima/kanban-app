import React from 'react'
import EditarTarefa from '../components/FormTarefa'
import { editarTarefa } from '../redux/actions/actions'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

class EditarTarefaContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefa: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTarefa = this.submitTarefa.bind(this)
		this.voltar = this.voltar.bind(this)
	}

	componentDidMount() {
		const { tarefa } = this.props.location.state
		this.setState({ tarefa })
	}

	handleInputChange(e) {
		const tarefa = Object.assign({}, this.state.tarefa)
		tarefa[e.target.name] = e.target.value
		this.setState({ tarefa })
	}

	submitTarefa(e) {
		this.props.editarTarefa(this.state.tarefa)
		this.props.history.push('/')
		e.preventDefault()
	}

	voltar() {
		this.props.history.push('/')
	}

	render() {
		return (
			<React.Fragment>
				<EditarTarefa
					handleChange={this.handleInputChange}
					handleSubmit={this.submitTarefa}
					tarefa={this.state.tarefa}
				/>

				<button
					className='btn btn-secondary'
					onClick={() => this.voltar()}
				>
					Voltar
				</button>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		tarefas: state,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		editarTarefa: (tarefa) => dispatch(editarTarefa(tarefa)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditarTarefaContainer)
)