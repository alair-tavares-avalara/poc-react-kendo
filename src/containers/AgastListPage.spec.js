import React from "react";
import { mount, shallow } from "enzyme";
import { AgastListPage } from "./AgastListPage";
import AgastList from "../components/agast/AgastList";
import initialState from "../reducers/initialState";
import { MemoryRouter as Router } from 'react-router-dom';

describe("<AgastListPage />", () => {
    const actions = {
        fetchAgast: jest.fn()
    };

    it("should contain <AgastList />", () => {
        const wrapper = shallow(
            <AgastListPage
                actions={actions}
                agasts={initialState.agastList}
            />
        );

        expect(wrapper.find(AgastList).length).toEqual(1);
    });

    it("calls handleFilter upon changing a page", () => {
        const wrapper = mount(
            <Router>
                <AgastListPage
                    actions={actions}
                    agasts={initialState.agastList}
                />
            </Router>
        );
        const name = "itemsPerPage";
        const value = 40;

        const input = wrapper.find('select');
        input.simulate("change", { target: { name, value } });

        expect(actions.fetchAgast).toHaveBeenCalledWith({
            skip: 0,
            pageSize: value
        });
    });
});