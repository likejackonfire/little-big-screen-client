import React from 'react'
import { shallow } from 'enzyme'
import AllShowsPageMain from './AllShowsPageMain'

it('renders correctly', () => {
    const component = shallow(<AllShowsPageMain match={{params: "sdlfkj"}}/>)
    expect(component).toMatchSnapshot()
})