import React from 'react';
import { shallow, render } from 'enzyme';
import PageTitle from './PageTitle';

describe('<PageTitle />', () => {
    it('should render title', () => {
        const title = 'Title';
        const wrapper = render(<PageTitle>{title}</PageTitle>);
        expect(wrapper.text()).toEqual(title);
    });
});