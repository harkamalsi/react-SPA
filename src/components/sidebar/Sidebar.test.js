import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar from './Sidebar';



it('renders correctly ', () => {
    const tree = renderer.create(<Sidebar 
        sendSoundCategory={()=> 0}
        sendTextCategory={()=> 0}
        sendPictureCategory={()=> 0}
        
        />).toJSON();
    expect(tree).toMatchSnapshot();
});



