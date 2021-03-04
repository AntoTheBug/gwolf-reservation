// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

if (process.env.NODE_ENV === 'test') {
    // React 16 Enzyme adapter
    const Enzyme = require('enzyme');
    const { shallow, render, mount } = Enzyme;
    const Adapter = require('enzyme-adapter-react-16');
    Enzyme.configure({ adapter: new Adapter() });

    // Make Enzyme functions available in all test files without importing
    // @ts-ignore
    global.shallow = shallow;
    // @ts-ignore
    global.render = render;
    // @ts-ignore
    global.mount = mount;

}
