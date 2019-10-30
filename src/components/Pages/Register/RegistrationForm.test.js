import React from 'react'
import { shallow } from 'enzyme'
import RegistrationForm from './RegistrationForm'

it('should render without crashing', () => {
  const component = shallow(<RegistrationForm />)
  expect(component).toMatchSnapshot()
})