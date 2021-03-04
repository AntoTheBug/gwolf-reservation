import React from 'react';
import { shallow, mount } from 'enzyme';
import Mood from '../Mood';

describe('Mood', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Mood className='pluto' text='🥐'/>)

        const ns = wrapper.find('Tot');
        expect(ns).toHaveLength(1)

        expect(ns.prop('className')).toMatch(/pluto/)
    });

    it('full rendering', () => {
        const mockClick = jest.fn();
        const wrapper = mount(
            <Mood className='brioche' text='🥐' click={mockClick}/>
        )

        const div = wrapper.find('div');
        expect(div.length).toEqual(1)

        expect(wrapper.html()).toMatch(/.*<button/)

        expect(mockClick).toHaveBeenCalledTimes(0)

        const button = wrapper.find('button')
        button.simulate('click')

        expect(mockClick).toHaveBeenCalledTimes(1)
    });
});
