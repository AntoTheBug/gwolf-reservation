import React from 'react';
import { shallow } from 'enzyme';
import Bannerone from '../Bannerone';

const Divone = ()=>(<><Bannerone title={'pippo'}/></>)

describe('Bannerone', ()=>{

    it('does stuff', () => {
        const wrapper = shallow(<Bannerone title="DON'T PANIC"/>);

        expect(wrapper.type()).toEqual('h1');
        expect(wrapper.props()).toEqual({children:"DON'T PANIC"});
        expect(wrapper.prop('title')).toBeUndefined();
        // expect(wrapper.children()).toEqual("DON'T PANIC");
    });

    xit('is what I expected', () => {
        // @ts-ignore
        const wrapper = shallow(<Divone/>);

        expect(wrapper.type()).toEqual(Bannerone);
        expect(wrapper.prop('title')).toEqual('pippo');
    });


});
