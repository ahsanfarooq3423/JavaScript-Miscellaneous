
import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter : new Adapter()});

describe('<BurgerBuilder/>',()=> {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />);
    })

    it('should render <BuildControls/> when recieving ingredients',()=> {
        wrapper.setProps({ings : {salad : 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})

