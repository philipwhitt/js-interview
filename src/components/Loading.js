import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div className="app-loader text-center">
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    )
  }
}

export default Loading