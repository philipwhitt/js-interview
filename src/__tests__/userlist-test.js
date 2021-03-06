import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import Adapter from 'enzyme-adapter-react-16'
import App from '../components/App'
import UserItem from '../components/UserItem'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  mockAxios.reset();
});

it('should display loading', () => {
  let wrapper = shallow(<App />)

  expect(wrapper.find(Loading)).to.have.lengthOf(1)
})

it('should display a list of user items', () => {
  let wrapper = shallow(<App />)

  mockAxios.mockResponse({
    data: {
      data: [
        {
          id: 1,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
          first_name: "George",
          last_name: "Bluth"
        },
        {
          id: 2,
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
          first_name: "Bob",
          last_name: "Loblaw"
        }
      ]
    }
  })

  expect(wrapper.find(UserItem)).to.have.lengthOf(2)
})

it('should display an error if svc fails', () => {
  let wrapper = shallow(<App />)

  mockAxios.mockError({
    message: "Error testing"
  })

  expect(wrapper.find(ErrorMessage)).to.have.lengthOf(1)
})