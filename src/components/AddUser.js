import React, { Component } from 'react'
import ErrorMessage from "./ErrorMessage.js"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class AddUser extends Component {

  _nameInput: ?HTMLInputElement

  constructor(props) {
    super(props)

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)

    this.state = {
      showModal: false,
      userAdded: false,
      isLoading: false
    }
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  resetModal() {
    this.setState({
      userAdded: false, 
      isLoading: false,
      showModal: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._nameInput) {
      this._nameInput.focus()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    var name = this._nameInput.value

    this._nameInput.disabled = true

    var fetchParams = {
      method: "POST",
      body: JSON.stringify({
        name: name
      })
    }

    this.setState({
      isLoading: true
    })

    fetch("https://reqres.in/api/users?delay=3", fetchParams)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            userAdded: true,
            isLoading: false
          })
        },

        (error) => {
          this.setState({
            isLoading: false,
            error
          })
        }
    )

    return false
  }

  render() {
    var modalFooter = () => (
      <Modal.Footer>
        <Button variant="link" onClick={this.close}>Close</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Modal.Footer>
    )

    if (this.state.isLoading) {
      modalFooter = () => (
        <Modal.Footer>
          <Button variant="secondary"><i className="fa fa-spinner fa-spin"></i> Adding User...</Button>
        </Modal.Footer>
      )
    }

    if (this.state.userAdded) {
      modalFooter = () => (
        <Modal.Footer>
          <Button variant="success"><i className="fa fa-check"></i> User Added!</Button>
        </Modal.Footer>
      )

      // reset dom
      setTimeout(()=> this.resetModal(), 2000)
    }

    if (this.state.error) {
      return (<ErrorMessage message={this.state.error.message} />);
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 adduser" onClick={this.open}>
            <div className="card">
              <span><i className="fa fa-plus"></i></span> <h5 className="mt-0">Create New</h5>
            </div>
          </div>
        </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  ref={c => (this._nameInput = c)} 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                />
              </Form.Group>
            </Modal.Body>
            {modalFooter()}
          </Form>
        </Modal>
      </div>
    )
  }
}

export default AddUser