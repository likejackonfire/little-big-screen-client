import React from 'react'
import { shallow } from 'enzyme'
import ShowPageMain from './ShowPageMain'

it('renders correctly', () => {
    const component = shallow(<ShowPageMain match={{params: "sdlfkj"}}/>)
    expect(component).toMatchSnapshot()
})