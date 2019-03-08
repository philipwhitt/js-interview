import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import configureStore from './store/configureStore'
import Header from './components/Header'
import UserList from './components/UserList'
import './styles.scss';

const store = configureStore()

render(
  <Router>
    <Provider store={store}>
      <div>
        <Header />
        <Route path="/" exact component={UserList} />
      </div>
    </Provider>
  </Router>,
  document.getElementById('root')
)
