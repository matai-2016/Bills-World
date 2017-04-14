import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import Home from '../client/components/Home'

test('<Home />', t => {
  const expected = 'Home Page'
  const wrapper = shallow(<Home />)
  t.equal(wrapper.text(), expected)
  t.end()
})
