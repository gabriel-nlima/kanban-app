import React from 'react'
import * as status from '../utils/status'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export const ActionsDropdown = ({ task, handleStatusChange }) => {
	const itemLabels = {
		[status.TODO]: task.status === status.TODO ? undefined : 'A fazer',
		[status.BEING_DONE]:
			task.status === status.BEING_DONE ? undefined : 'Fazer',
		[status.FINISHED]:
			task.status === status.FINISHED ? undefined : 'Concluir',
		[status.FILED]: task.status === status.FILED ? undefined : 'Arquivar',
		[status.DELETED]: 'Deletar',
	}

	return (
		<DropdownButton
			as={ButtonGroup}
			variant='light'
			size='sm'
			id='actions'
			title='Ações'
		>
			{status.actions.map((action) => {
				if (itemLabels[action]) {
					return (
						<Dropdown.Item
							key={action}
							onClick={() => handleStatusChange(task, action)}
						>
							{itemLabels[action]}
						</Dropdown.Item>
					)
				} else return undefined
			})}
		</DropdownButton>
	)
}
