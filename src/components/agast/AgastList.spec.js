import React from 'react';
import AgastList from './AgastList';

describe('<AgastList />', () => {
  it('should display savings when savings exist', () => {
    const wrapper = shallow(<AgastList/>);
    // console.log(wrapper.debug()); // View shallowly rendered component
    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(2);
  });
});