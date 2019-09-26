import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './AudioPlayer';



it('renders correctly ', () => {
    const tree = renderer.create(<AudioPlayer/>).toJSON();
    expect(tree).toMatchSnapshot();
});



