import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

class UserActivators extends Component {

  render() {
    var editActivators = () => (
      <div className="col-sm-2 editMode">
        <button 
          onClick={this.props.toggleEditMode} 
          className="btn btn-link text-dark">
            <i className="fa fa-pencil"></i>
        </button>
        <button 
          onClick={this.props.openConfirmModal} 
          className="btn btn-link text-dark">
            <i className="fa fa-trash"></i>
        </button>
      </div>
    )

    if (this.props.isEditMode) {
      editActivators = () => (
        <div className="col-sm-2 editModeOptions">
          <button onClick={this.props.handleSave} className="btn btn-link text-success">
            <i className="fa fa-check"></i>
          </button>
          <button onClick={this.props.toggleEditMode} className="btn btn-link text-danger">
            <i className="fa fa-close"></i>
          </button>
        </div>
      )
    }

    if (this.props.isSaving) {
      editActivators = () => (
        <div className="col-sm-2 editMode isSaving">
          <button className="btn btn-link text-dark">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        </div>
      )
    }

    return editActivators();
  }
}

export default UserActivators