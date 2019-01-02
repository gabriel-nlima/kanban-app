import React from 'react'

const Quadro = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-4'>
					<h3 className='text-primary'>A FAZER</h3>
				</div>
				<div className='col-4'>
					<h3 className='text-warning'>FAZENDO</h3>
				</div>
				<div className='col-4'>
					<h3 className='text-success'>FEITO</h3>
				</div>
			</div>
			<div className='row'>
				<div className='col-4 card-decks' />
				<div className='col-4 card-decks' />
				<div className='col-4 card-decks' />
			</div>
		</div>
	)
}
export default Quadro
