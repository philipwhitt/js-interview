import React, { Component } from 'react'
import Loading from "./Loading.js"
import ErrorMessage from "./ErrorMessage.js"
import UserListItem from "./UserListItem.js"
import AddUser from "./AddUser.js"

class UserList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      users: []
    }
  }

  componentDidMount() {
    fetch("https://reqres.in/api/users?per_page=20&delay=2")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.data
          })
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
    )
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
      <UserListItem key={user.id} user={user} />
    )

    return (
      <div className="container">
        <h1>User Accounts</h1>
        <AddUser />
        <div className="row">{listItems}</div>
      </div>
    )
  }
}

export default UserList