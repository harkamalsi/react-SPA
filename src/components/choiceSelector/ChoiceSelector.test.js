import React from 'react';
import renderer from 'react-test-renderer';

import ChoiceSelector from './choiceSelector';



it('renders correctly ', () => {
    const tree = renderer.create(<ChoiceSelector sendCategory={()=> 0}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

