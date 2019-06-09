import React from 'react'

import Modal from 'react-bootstrap/Modal'

export default function FormModal({ data, showModal, Form, hide }) {
	return (
		<Modal show={showModal} centered={true} onHide={hide}>
			<Modal.Body>
				<Form data={data} handleModal={hide} />
			</Modal.Body>
		</Modal>
	)
}
