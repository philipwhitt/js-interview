import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
              <a className="navbar-brand mb-0 h1" href="/">Super Hero Co.</a>
          </div>
        </nav>
        <div className="container">
          <h1>{this.props.isLoading ? <i className="fa fa-spin fa-spinner"></i> : null} User Accounts</h1>
        </div>
      </>
    )
  }

}

export default Header