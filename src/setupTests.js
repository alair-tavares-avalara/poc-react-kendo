import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';

global.shallow = shallow;
global.mount = mount;
global.render = render;

configure({ adapter: new Adapter() });