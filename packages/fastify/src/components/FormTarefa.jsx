import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import * as status from '../containers/status'

const FormTarefa = ({ handleSubmit, handleChange, tarefa }) => {
	return (
		<form onSubmit={handleSubmit} className='needs-validation'>
			<div className='form-row'>
				<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<label htmlFor='titulo'>Titulo</label>
					<input
						name='titulo'
						id='titulo'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Titulo'
						data-testid='inputTitulo'
						value={tarefa.titulo || ''}
						maxLength='35'
						required
					/>
				</div>
			</div>
			<div className='form-row'>
				<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<label htmlFor='descricao'>Descrição</label>
					<textarea
						rows='2'
						name='conteudo'
						id='descricao'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Descrição'
						maxLength='75'
						data-testid='inputConteudo'
						value={tarefa.conteudo || ''}
					/>
				</div>
			</div>
			{tarefa._id ? (
				<div className='form-row'>
					<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
						<label htmlFor='selectStatus'>Status</label>
						<select
							className='form-control'
							id='selectStatus'
							name='status'
							onChange={handleChange}
							value={tarefa.status}
						>
							<option value={status.FAZER}>A FAZER</option>
							<option value={status.FAZENDO}>FAZENDO</option>
							<option value={status.CONCLUIDO}>CONCLUIDO</option>
							<option value={status.ARQUIVADO}>ARQUIVADO</option>
						</select>
					</div>
				</div>
			) : (
				''
			)}

			<div className='form-row'>
				<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<label htmlFor='tag1'>Tag 01</label>
					<input
						id='tag1'
						name='tag1'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Tag 01'
						value={tarefa.tag1 || ''}
						maxLength='15'
					/>
				</div>
			</div>
			<div className='form-row'>
				<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<label htmlFor='tag2'>Tag 02</label>
					<input
						id='tag2'
						name='tag2'
						type='text'
						className='form-control mb-2 mr-sm-2'
						onChange={handleChange}
						placeholder='Tag 02'
						value={tarefa.tag2 || ''}
						maxLength='15'
					/>
				</div>
			</div>
			<div className='form-row text-right'>
				<div className='form-group col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6'>
					<Link
						to='/'
						className='btn btn-secondary'
						data-testid='btnVoltar'
					>
						Voltar
					</Link>
					<button
						type='submit'
						style={{ marginLeft: 5 }}
						className='btn btn-primary'
					>
						Salvar Tarefa
					</button>
				</div>
			</div>
		</form>
	)
}

export default withRouter(FormTarefa)
