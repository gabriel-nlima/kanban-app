import React from 'react'

const Spinner = ({ bg }) => (
	<div className='d-flex justify-content-center'>
		<div
			className={`spinner-border ${bg}`}
			style={{ width: 80, height: 80 }}
			role='status'
		>
			<span className='sr-only'>Carregando...</span>
		</div>
	</div>
)

export default Spinner
