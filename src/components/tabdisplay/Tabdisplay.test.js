import React from 'react';
import renderer from 'react-test-renderer';

import Tabdisplay from './Tabdisplay';



it('renders correctly ', () => {
    const tree = renderer.create(<Tabdisplay/>).toJSON();
    expect(tree).toMatchSnapshot();
});

