import axios from 'axios'
import React, { Component } from 'react'
import Loading from "./Loading.js"
import ErrorMessage from "./ErrorMessage.js"
import UserListItem from "./UserListItem.js"
import AddUser from "./AddUser.js"

class UserList extends Component {

  constructor(props) {
    super(props)

    this.refreshServerData = this.refreshServerData.bind(this);
    this.usersLoaded = this.usersLoaded.bind(this);
    this.error = this.error.bind(this);
    this.userAdded = this.userAdded.bind(this);
    this.userChanged = this.userChanged.bind(this);

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
    axios.get("https://reqres.in/api/users?per_page=20&delay=2")
      .then(this.usersLoaded)
      .catch(this.error)
  }

  usersLoaded(response) {
    this.setState({
      isLoaded: true,
      isBackgroundRefresh: false,
      users: response.data.data
    })
  }

  error(error) {
    this.setState({
      isLoaded: true,
      isBackgroundRefresh: false,
      error
    })
  }

  userChanged(data) {
    
  }

  userAdded(data) {
    var nameParts = data.name.split(' ')

    // reqres.in API is inconsistent af
    var newUser = {
      id : data.id,
      avatar: 'https://via.placeholder.com/40/DDDDDD.png?text=?',
      first_name : nameParts[0],
      last_name : nameParts[1]
    }

    this.state.users.unshift(newUser);

    this.setState({});
  }

  // app with real api would forgo the state.user manipulation in favor of 
  // refreshing the data on screen using data from server
  refreshServerData(data) {
    // 'Skipping background refresh in favor of client side state save'
    // this.setState({
    //   isBackgroundRefresh: true
    // })

    // this.loadData();
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
      <UserListItem key={user.id} user={user} propgateChange={this.userChanged} />
    )

    var header = (
      <h1>User Accounts</h1>
    )

    if (this.state.isBackgroundRefresh) {
      header = (
        <h1><i className="fa fa-spin fa-spinner"></i> User Accounts</h1>
      )
    }

    return (
      <div className="container">
        {header}
        <AddUser propgateChange={this.userAdded} />
        <div className="row">
          {listItems}
        </div>
      </div>
    )
  }
}

export default UserList