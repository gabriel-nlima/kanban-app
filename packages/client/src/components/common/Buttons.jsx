import React from 'react'

import Button from 'react-bootstrap/Button'

export const Back = ({ onClick }) => (
	<Button variant={'secondary'} onClick={onClick}>
		Voltar
	</Button>
)
export const Save = ({ text }) => (
	<Button type='submit' className='margin-left-minor' variant='primary'>
		{text}
	</Button>
)
