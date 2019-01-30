import React from 'react'

const Spinner = ({ bg }) => {
	return (
		<div className='d-flex justify-content-center'>
			<div
				className={'spinner-border ' + bg}
				style={{ width: 75, height: 75 }}
				role='status'
			>
				<span className='sr-only'>Carregando...</span>
			</div>
		</div>
	)
}

export default Spinner
