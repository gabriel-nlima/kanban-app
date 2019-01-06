import React from 'react'

const AddTarefa = ({ handleSubmit, handleChange }) => {
	return (
		<form onSubmit={handleSubmit}>
			<input
				name='titulo'
				type='text'
				onChange={handleChange}
				placeholder='Titulo da tarefa'
			/>
			<input
				name='conteudo'
				type='text'
				onChange={handleChange}
				placeholder='Conteudo'
			/>
			<input
				name='data'
				type='date'
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
