import React from 'react'

const AddTarefa = ({ handleSubmit, handleChange }) => {
	return (
		<form onSubmit={handleSubmit} className='form-inline'>
			<input
				name='titulo'
				type='text'
				className='form-control mb-2 mr-sm-2'
				onChange={handleChange}
				placeholder='Titulo da tarefa'
			/>
			<input
				name='conteudo'
				type='text'
				className='form-control mb-2 mr-sm-2'
				onChange={handleChange}
				placeholder='Conteudo'
			/>
			<input
				name='data'
				type='date'
				className='form-control mb-2 mr-sm-2'
				onChange={handleChange}
				placeholder='Data'
			/>
			<button type='submit' className='btn btn-primary'>
				Adicionar tarefa
			</button>
		</form>
	)
}

export default AddTarefa
