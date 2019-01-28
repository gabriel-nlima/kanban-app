import React from 'react'
import EditarTarefa from '../components/FormTarefa'
import { editarTarefa } from '../redux/actions/actions'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

export class EditarTarefaContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefa: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTarefa = this.submitTarefa.bind(this)
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

	render() {
		return (
			<React.Fragment>
				<EditarTarefa
					handleChange={this.handleInputChange}
					handleSubmit={this.submitTarefa}
					tarefa={this.state.tarefa}
				/>
			</React.Fragment>
		)
	}
}

EditarTarefaContainer.propTypes = {
	editarTarefa: PropTypes.func.isRequired,
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
