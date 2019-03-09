import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import Adapter from 'enzyme-adapter-react-16'
import AddUser from '../components/AddUser'
import ErrorMessage from '../components/ErrorMessage'

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  mockAxios.reset();
});

it('should show modal when clicked', () => {
  let wrapper = shallow(<AddUser />)

  wrapper.find('.adduser').simulate('click');

  expect(wrapper.instance().state.showModal).to.be.true
})

it('should post a user', () => {
  let wrapper = shallow(<AddUser />)

  wrapper.instance()._nameInput = {
    value: 'Job Bluth',
    focus: function() {}
  }
  wrapper.instance().handleSubmit(new Event('submit'))

  var req = mockAxios.lastReqGet()
  expect(req.data.name).to.equal('Job Bluth')
})
