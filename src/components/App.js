import axios from 'axios'
import React, { Component } from 'react'
import Loading from "./Loading.js"
import ErrorMessage from "./ErrorMessage.js"
import UserItem from "./UserItem.js"
import AddUser from "./AddUser.js"
import Header from "./Header.js"

class App extends Component {

  constructor(props) {
    super(props)

    this.refreshServerData = this.refreshServerData.bind(this);
    this.usersLoaded = this.usersLoaded.bind(this);
    this.handleError = this.handleError.bind(this);
    this.userAdded = this.userAdded.bind(this);
    this.userDeleted = this.userDeleted.bind(this);

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
      .catch(this.handleError)
  }

  usersLoaded(response) {
    this.setState({
      isLoaded: true,
      isBackgroundRefresh: false,
      users: response.data.data
    })
  }

  handleError(error) {
    this.setState({
      isLoaded: true,
      isBackgroundRefresh: false,
      error
    })
  }

  userDeleted(deletedUser) {
    for (var i = this.state.users.length - 1; i >= 0; i--) {
      if (this.state.users[i].id === deletedUser.id) {
        this.state.users.splice(i, 1)
      }
    }
    this.setState({})
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
    if (this.state.error) {
      return (<ErrorMessage message={this.state.error.message} />);
    }

    var body = (<Loading />)
    
    if (this.state.isLoaded) {
      body = this.state.users.map((user) =>
        <UserItem key={user.id} user={user} propgateChange={this.userDeleted} />
      )
    }

    return (
      <>
        <Header isLoading={this.state.isBackgroundRefresh} />
        <div className="container">
          <AddUser propgateChange={this.userAdded} />
          <div className="row">
            {body}
          </div>
        </div>
      </>
    )
  }
}

export default App