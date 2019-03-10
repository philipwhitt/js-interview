import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UserDeleteModal extends Component {

  render() {
    var modalFooter = () => (
      <Modal.Footer>
        <Button variant="link" onClick={this.props.closeConfirmModal}>Cancel</Button>
        <Button variant="danger" type="submit" onClick={this.props.deleteUser}>Delete</Button>
      </Modal.Footer>
    )

    if (this.props.isDeleting) {
      modalFooter = () => (
        <Modal.Footer>
          <Button variant="secondary"><i className="fa fa-spinner fa-spin"></i> Deleting...</Button>
        </Modal.Footer>
      )
    }

    return (
      <Modal show={this.props.showConfirmModal} onHide={this.props.closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Are you sure you want to delete {this.props.fullName}?</p>
        </Modal.Body>
        {modalFooter()}
      </Modal>
    )
  }
}

export default UserDeleteModal