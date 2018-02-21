import React from 'react';
import { mount, shallow } from 'enzyme';
import { PureAgastFormPage as AgastFormPage } from './AgastFormPage';
import { PureAgastForm as AgastForm } from '../components/agast/AgastForm';
import initialState from '../reducers/initialState';
import { MemoryRouter as Router } from 'react-router-dom';

describe('<AgastFormPage />', () => {
    const actions = {
        fetchListAgast: jest.fn(),
        saveAgast: jest.fn()
    };

    it('should contain <AgastForm />', () => {
        const wrapper = mount(
            <AgastFormPage
                saveAgast={{}}
                actions={actions}
            />
        );

        expect(wrapper.find(AgastForm).length).toEqual(1);
    });

    it('should go back when giving success on saving', () => {
        const goBack = jest.fn();
        const wrapper = mount(
            <AgastFormPage
                history={{ goBack }}
                saveAgast={{}}
                actions={actions}
            />
        );

        expect(goBack).not.toBeCalled();

        wrapper.setProps({ saveAgast: { status: 200 } });

        expect(goBack).toBeCalled();
    });

    it('should not go back when giving error on saving', () => {
        const goBack = jest.fn();
        const wrapper = mount(
            <AgastFormPage
                history={{ goBack }}
                saveAgast={{}}
                actions={actions}
            />
        );

        wrapper.setProps({ saveAgast: { status: 500 } });

        expect(goBack).not.toBeCalled();
    });

    it('should handle cancel', () => {
        const goBack = jest.fn();
        const wrapper = mount(
            <AgastFormPage
                history={{ goBack }}
                saveAgast={{}}
                actions={actions}
            />
        );

        const button = wrapper.find('#cancelButton');
        expect(button.length).toEqual(1);
        button.simulate("click");

        expect(goBack).toBeCalled();
    });

    it('should handle save', () => {
        const agast = {
            origin: 'Agast Origin',
            info: 'Agast Info',
            code: 'AGT1234',
            description: 'Agast description',
            company: 'Avalara BR'
        };
        const saveAgast = jest.fn();
        const wrapper = mount(
            <AgastFormPage
                saveAgast={{}}
                actions={actions}
            />
        );

        expect(wrapper.find('button#saveButton').render().attr('disabled')).toBeDefined();

        simulateChangeAll(wrapper, agast);

        expect(wrapper.find('button#saveButton').render().attr('disabled')).toBeUndefined();

        const button = wrapper.find('#saveButton');
        expect(button.length).toEqual(1);
        button.simulate("click");

        expect(actions.saveAgast).toBeCalled();
    });
});