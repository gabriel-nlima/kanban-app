import React from 'react'
import Tarefas from '../components/Tarefas'
const props = {
	tarefas: [
		{
			titulo: 'Fazer o quadro Kanban',
			conteudo: 'Fazer o quadro Kanban com react, redux etc',
			data: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		},
		{
			titulo: 'Adiconar o redux',
			conteudo: 'Adicionar o redux ao projeto',
			data: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		},
		{
			titulo: 'Fazer o backend',
			conteudo: 'fazer o servidor backend do projeto',
			data: '02/01/2019',
			status: 'a fazer',
			background: 'text-white bg-primary',
			btnBg: 'btn-light',
		},
	],
}
class TarefasContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tarefas: [],
		}
	}
	//Funções para obter as tarefas e gerenciar o status

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-4'>
						<h3 className='text-primary'>A FAZER</h3>
					</div>
					<div className='col-4'>
						<h3 className='text-warning'>FAZENDO</h3>
					</div>
					<div className='col-4'>
						<h3 className='text-success'>FEITO</h3>
					</div>
				</div>
				<div className='row'>
					<div className='col-4 card-decks'>
						<Tarefas {...props} />
					</div>
					<div className='col-4 card-decks'>
						<Tarefas {...props} />
					</div>
					<div className='col-4 card-decks'>
						<Tarefas {...props} />
					</div>
				</div>
			</div>
		)
	}
}
export default TarefasContainer
