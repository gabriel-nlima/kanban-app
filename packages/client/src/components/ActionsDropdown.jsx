import React from 'react'
import * as status from '../utils/status'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export const ActionsDropdown = ({ task, handleStatusChange }) => (
	<DropdownButton variant='primary' size='sm' id='actions' title='Ações'>
		{status.actions.map((action) => {
			let text = ''
			if (action === status.TODO) text = 'A Fazer'
			else if (action === status.BEING_DONE) text = 'Fazer'
			else if (action === status.FINISHED) text = 'Concluir'
			else if (action === status.FILED) {
				if (task.status === status.FILED) text = ''
				else text = 'Arquivar'
			} else text = 'Deletar'

			return (
				<Dropdown.Item
					key={action}
					onClick={() => handleStatusChange(task, action)}
				>
					{text}
				</Dropdown.Item>
			)
		})}
	</DropdownButton>
)
