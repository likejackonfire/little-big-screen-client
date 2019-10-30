import React from 'react'
import { shallow } from 'enzyme'
import Navbar from './Navbar'

it('should render without crashing', () => {
  const component = shallow(<Navbar />)
  expect(component).toMatchSnapshot()
})