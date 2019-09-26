import React from 'react';
import renderer from 'react-test-renderer';

import Maindisplay from './Maindisplay';



it('renders correctly ', () => {
    const tree = renderer.create(<Maindisplay/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly when passing multiple props', () =>{
    const tree = renderer.create(<Maindisplay
         selectedTab="1" 
         soundCategory="Nature"
         />).toJSON();
    expect(tree).toMatchSnapshot();
});

