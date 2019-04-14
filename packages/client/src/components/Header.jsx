import React from 'react'
import Row from 'react-bootstrap/Row'

const Header = () => {
	return (
		<Row>
			<header className='text-left'>
				<h3>Quadro Kanban</h3>
				<h4 className='text-muted'>
					Crie e acompanhe projetos suas respectivas tarefas
				</h4>
			</header>
		</Row>
	)
}

export default Header
