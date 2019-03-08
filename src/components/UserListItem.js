import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';

class UserListItem extends Component {

  _input: ?HTMLInputElement;

  constructor(props) {
    super(props)

    this.toggleEditMode = this.toggleEditMode.bind(this)

    this.state = {
      isEditMode: false
    }
  }

  toggleEditMode() {
    this.setState({ isEditMode: this.state.isEditMode ? false : true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._input) {
      this._input.focus();
    }
  }

  fullName() {
    return this.props.user.first_name + " " +this.props.user.last_name
  }

  render() {
    var editOptions = () => (
      <div className="col-sm-2 editModeOptions">
        <a className="btn btn-link text-success"><i className="fa fa-check"></i></a>
        <a onClick={this.toggleEditMode} className="btn btn-link text-danger"><i className="fa fa-close"></i></a>
      </div>
    )

    var nameEdit = () => (
      <Form.Group controlId="formName">
        <Form.Control ref={c => (this._input = c)} type="text" placeholder="First Name" defaultValue={this.fullName()} required />
      </Form.Group>
    )

    var nameStatic = () => (
      <h5 className="mt-0">{this.fullName()}</h5>
    )

    var editActivator = () => (
      <div className="col-sm-2 editMode">
        <a onClick={this.toggleEditMode} className="btn btn-link"><i className="fa fa-pencil"></i></a>
      </div>
    )

    return (
      <div className="col-sm-6 userItem" key={this.props.user.id} rel={this.props.user.id}>
        <div className="card">
          <div className="row">
            <div className="media col-sm-10">
              <img height="40" src={this.props.user.avatar} className="mr-3" alt={this.fullName()} />
              <div className="media-body">
                {this.state.isEditMode ? nameEdit() : nameStatic()}
              </div>
            </div>
            { !this.state.isEditMode ? editActivator() : null }
            { this.state.isEditMode ? editOptions() : null }
          </div>
        </div>
      </div>
    )
  }
}

export default UserListItem