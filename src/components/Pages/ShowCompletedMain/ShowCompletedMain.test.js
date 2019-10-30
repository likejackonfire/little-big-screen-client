import React from 'react'
import { shallow } from 'enzyme'
import ShowCompletedMain from './ShowCompletedMain'

it('renders correctly', () => {
    const component = shallow(<ShowCompletedMain/>)
    expect(component).toMatchSnapshot()
})