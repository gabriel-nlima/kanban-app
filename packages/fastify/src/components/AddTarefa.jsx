import React from 'react'

const AddTarefa = ({ handleSubmit, handleChange }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-row'>
				<div className='col-4'>
					<input
						name='titulo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Titulo'
					/>
				</div>
				<div className='col-5'>
					<input
						name='conteudo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Descrição'
					/>
				</div>
				<div className='col-3'>
					<button type='submit' className='btn btn-primary'>
						Nova tarefa
					</button>
				</div>
			</div>
		</form>
	)
}

export default AddTarefa
