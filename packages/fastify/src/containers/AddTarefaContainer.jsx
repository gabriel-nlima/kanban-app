import React from 'react'
import AddTarefa from '../components/FormTarefa'
import { addTarefa } from '../redux/actions/actions'

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
		this.setState({ tarefa: [] })
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
