import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Header from './components/Header'
import UserList from './components/UserList'
import './styles.scss';

const store = configureStore()

render(
  <Provider store={store}>
    <div>
      <Header />
      <UserList />
    </div>
  </Provider>,
  document.getElementById('root')
)
