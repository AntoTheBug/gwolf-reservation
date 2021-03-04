import React from 'react';
import { shallow } from 'enzyme';
import Bannerino from '../Bannerino';

describe('Bannerino', ()=>{
    it('renders without crashing', () => {
        shallow(<Bannerino/>)
    });

    it('does stuff', () => {
        const wrapper = shallow(<Bannerino />);
        expect(wrapper.type()).toEqual("h2");
        expect(wrapper.props()).toEqual({});
    });
});
