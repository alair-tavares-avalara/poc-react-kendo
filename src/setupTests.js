import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

global.shallow = shallow;
global.mount = mount;
global.render = render;

global.simulateChangeAll = (wrapper, object) => {
    Object.keys(object).forEach(key => simulateChange(wrapper, key, object[key]));
};

global.simulateChange = (wrapper, inputName, inputValue) => {
    const changeEvent = { target: { name: inputName, value: inputValue } };
    let input = wrapper.find(`input[name="${inputName}"]`);
    if (input.length > 1) {
        input = input.first();
    }

    return input.simulate('change', changeEvent);
};

configure({ adapter: new Adapter() });