import React from 'react'

const AddTarefa = ({ handleSubmit, handleChange }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-row'>
				<div className='col-3'>
					<input
						name='titulo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Titulo da tarefa'
					/>
				</div>
				<div className='col-3'>
					<input
						name='conteudo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Conteudo'
					/>
				</div>
				<div className='col-3'>
					<input
						name='data'
						type='date'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Data'
					/>
				</div>
				<div className='col-3'>
					<button type='submit' className='btn btn-primary'>
						Adicionar tarefa
					</button>
				</div>
			</div>
		</form>
	)
}

export default AddTarefa
