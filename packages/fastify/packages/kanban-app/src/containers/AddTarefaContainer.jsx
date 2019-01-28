import React from 'react'
import AddTarefa from '../components/FormTarefa'
import { addTarefa } from '../redux/actions/actions'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class AddTarefaContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefa: [],
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitTarefa = this.submitTarefa.bind(this)
	}

	componentDidMount() {}

	handleInputChange(e) {
		const tarefa = Object.assign({}, this.state.tarefa)
		tarefa[e.target.name] = e.target.value
		this.setState({ tarefa })
	}
	submitTarefa(e) {
		this.props.addTarefa(this.state.tarefa)
		this.setState({ tarefa: [] })
		this.props.history.push('/')
		e.preventDefault()
	}

	render() {
		return (
			<AddTarefa
				handleChange={this.handleInputChange}
				handleSubmit={this.submitTarefa}
				tarefa={this.state.tarefa}
			/>
		)
	}
}

AddTarefaContainer.propTypes = {
	addTarefa: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		tarefas: state,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addTarefa: (tarefa) => dispatch(addTarefa(tarefa)),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AddTarefaContainer)
)
