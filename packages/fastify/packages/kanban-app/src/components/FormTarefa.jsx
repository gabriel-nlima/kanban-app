import React from 'react'

const FormTarefa = ({ handleSubmit, handleChange, tarefa }) => {
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
						value={tarefa.titulo || ''}
					/>
				</div>
				<div className='col-5'>
					<input
						name='conteudo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Descrição'
						value={tarefa.conteudo || ''}
					/>
				</div>
				<div className='col-3'>
					<button type='submit' className='btn btn-primary'>
						Salvar Tarefa
					</button>
				</div>
			</div>
		</form>
	)
}

export default FormTarefa
