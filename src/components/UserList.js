import React, { Component } from 'react'
import Loading from "./Loading.js"
import ErrorMessage from "./ErrorMessage.js"
import UserListItem from "./UserListItem.js"
import AddUser from "./AddUser.js"

class UserList extends Component {

  constructor(props) {
    super(props)

    this.childComponentChanged = this.childComponentChanged.bind(this);

    this.state = {
      error: null,
      isBackgroundRefresh: false,
      isLoaded: false,
      users: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch("https://reqres.in/api/users?per_page=20&delay=2")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            isBackgroundRefresh: false,
            users: result.data
          })
        },

        (error) => {
          this.setState({
            isLoaded: true,
            isBackgroundRefresh: false,
            error
          })
        }
    )
  }

  childComponentChanged() {
    this.setState({
      isBackgroundRefresh: true
    })

    this.loadData();
  }

  render() {
    const { error, isLoaded, users } = this.state;

    if (error) {
      return (<ErrorMessage message={error.message} />);
    } 

    if (!isLoaded) {
      return (<Loading />);
    }

    const listItems = users.map((user) =>
      <UserListItem key={user.id} user={user} propgateChange={this.childComponentChanged} />
    )

    var header = () => (
      <h1>User Accounts</h1>
    )

    if (this.state.isBackgroundRefresh) {
      header = () => (
        <h1><i className="fa fa-spin fa-spinner"></i> User Accounts</h1>
      )
    }

    return (
      <div className="container">
        {header()}
        <AddUser propgateChange={this.childComponentChanged} />
        <div className="row">{listItems}</div>
      </div>
    )
  }
}

export default UserList