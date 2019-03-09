import React, { Component } from 'react'
import axios from 'axios'
import ErrorMessage from "./ErrorMessage.js"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UserListItem extends Component {

  _input: ?HTMLInputElement;

  constructor(props) {
    super(props)

    this.state = {
      isSaving: false,
      isEditMode: false,
      showConfirmModal: false,
      isDeleting: false 
    }

    this._svcUrl = "https://reqres.in/api/users/" + 
      this.props.user.id +
      "?delay=2"

    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.closeConfirmModal = this.closeConfirmModal.bind(this)
    this.openConfirmModal = this.openConfirmModal.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleNetworkSuccess = this.handleNetworkSuccess.bind(this)
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  openConfirmModal() {
    this.setState({ showConfirmModal: true })
  }

  toggleEditMode() {
    this.setState({ isEditMode: this.state.isEditMode ? false : true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._input) {
      this._input.focus();
    }
  }

  handleSave() {
    this.setState({
      isSaving: true
    })

    this._input.disabled = true

    var putParams = {
      name: this._input.value
    }

    this.setState({
      isLoading: true
    })

    axios.put(this._svcUrl, putParams)
      .then(this.handleNetworkSuccess)
      .catch(this.handleError)
  }

  handleError(error) {
    this.setState({
      isSaving: false,
      isEditMode: false,
      error
    })
  }

  handleNetworkSuccess(response) {
    this.setState({
      isSaving: false,
      isEditMode: false,
      isDeleting: false,
      showConfirmModal: false
    })

    this.props.propgateChange()
  }

  deleteUser() {
    this.setState({
      isDeleting: true
    })

    axios.delete(this._svcUrl)
      .then(this.handleNetworkSuccess)
      // .catc(this.handleError)
  }

  fullName() {
    return this.props.user.first_name + " " +this.props.user.last_name
  }

  render() {
    var name = () => (
      <h5 className="mt-0">{this.fullName()}</h5>
    )

    var editActivators = () => (
      <div className="col-sm-2 editMode">
        <button 
          onClick={this.toggleEditMode} 
          className="btn btn-link text-dark">
            <i className="fa fa-pencil"></i>
        </button>
        <button 
          onClick={this.openConfirmModal} 
          className="btn btn-link text-dark">
            <i className="fa fa-trash"></i>
        </button>
      </div>
    )

    if (this.state.isEditMode) {
      name = () => (
        <Form.Group controlId="formName">
          <Form.Control 
            ref={c => (this._input = c)} 
            type="text" 
            placeholder="First Name" 
            defaultValue={this.fullName()} 
            required 
          />
        </Form.Group>
      )

      editActivators = () => (
        <div className="col-sm-2 editModeOptions">
          <button onClick={this.handleSave} className="btn btn-link text-success">
            <i className="fa fa-check"></i>
          </button>
          <button onClick={this.toggleEditMode} className="btn btn-link text-danger">
            <i className="fa fa-close"></i>
          </button>
        </div>
      )
    }

    if (this.state.isSaving) {
      editActivators = () => (
        <div className="col-sm-2 editMode isSaving">
          <button className="btn btn-link text-dark">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        </div>
      )
    }

    if (this.state.error) {
      return (<ErrorMessage message={this.state.error.message} />);
    }

    var modalFooter = () => (
      <Modal.Footer>
        <Button variant="link" onClick={this.closeConfirmModal}>Cancel</Button>
        <Button variant="danger" type="submit" onClick={this.deleteUser}>Delete</Button>
      </Modal.Footer>
    )

    if (this.state.isDeleting) {
      modalFooter = () => (
        <Modal.Footer>
          <Button variant="secondary"><i className="fa fa-spinner fa-spin"></i> Deleting...</Button>
        </Modal.Footer>
      )
    }

    return (
      <div className="col-sm-6 userItem" key={this.props.user.id} rel={this.props.user.id}>
        <div className="card">
          <div className="row">
            <div className="media col-sm-10">
              <img height="40" src={this.props.user.avatar} className="mr-3" alt={this.fullName()} />
              <div className="media-body">
                {name()}
              </div>
            </div>
            {editActivators()}
          </div>
        </div>

        <Modal show={this.state.showConfirmModal} onHide={this.closeConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="lead">Are you sure you want to delete {this.fullName()}?</p>
          </Modal.Body>
          {modalFooter()}
        </Modal>
      </div>
    )
  }
}

export default UserListItem