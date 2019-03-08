import React, { Component } from 'react'

class ErrorMessage extends Component {
  render() {
    return (
      <div className="alert alert-warning" role="alert">
        <p className="lead">An Error Occurred:</p>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default ErrorMessage