import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const CustomSpinner = ({ bg, size }) => (
	<Spinner animation='border' size={size} variant={bg} role='status'>
		<span className='sr-only'>Loading...</span>
	</Spinner>
)

export default CustomSpinner
