import React from 'react'
import { shallow } from 'enzyme'
import Show from './Show'

it('renders empty given no tabs', () => {
    const component = shallow(<Show id={20394} title="test"/>)
    expect(component).toMatchSnapshot()
})