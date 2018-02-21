import React from 'react';
import { shallow } from 'enzyme';

// Components
import App from '../App';

describe('App component', () => {

  it('should render normally', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App').length).toBe(1);
  })
})
