import React from 'react'
import { shallow } from 'enzyme'
import Landing from './Landing'

it('should render without crashing', () => {
  const component = shallow(<Landing />)
  expect(component).toMatchSnapshot()
})