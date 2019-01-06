import React from 'react'
import AddTarefa from '../components/AddTarefa'
import { addTarefa } from '../actions/actions'

import { connect } from 'react-redux'

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
		e.preventDefault()
	}

	render() {
		return (
			<AddTarefa
				handleChange={this.handleInputChange}
				handleSubmit={this.submitTarefa}
			/>
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
		addTarefa: (tarefa) => dispatch(addTarefa(tarefa)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTarefaContainer)
