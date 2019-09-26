import React from 'react';
import renderer from 'react-test-renderer';

import Tabchoice from './Tabchoice';



it('renders correctly ', () => {
    const tree = renderer.create(<Tabchoice/>).toJSON();
    expect(tree).toMatchSnapshot();
});



it('renders correctly when passing props', () =>{
    const tree = renderer.create(<Tabchoice
         value="1"
         />).toJSON();
    expect(tree).toMatchSnapshot();
});

