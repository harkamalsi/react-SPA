import React from 'react';
import './Sidebar.css';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';

//Sidebar it´s the parent component of the 3 choiceSelector components that build the gui.
//It´s a functional component and an interface between the app and the ChoiceSelector componets.
//It´s main purpouse is to render the Choice Selector and pass down the props for changing state values of App from the ChoiceSelector

const Sidebar = props => {
  return (
    <div className='sidebar'>
      <h3>Kategorier</h3>
      <ChoiceSelector
        sendCategory={props.sendSoundCategory}
        categoryName='Sound'
        alternative1='Nature'
        alternative2='Piano'
        alternative3='City Life'
      />

      <ChoiceSelector
        sendCategory={props.sendTextCategory}
        categoryName='Tekst'
        alternative1='Emosjoner'
        alternative2='Farger'
        alternative3='Dyr'
      />
      <ChoiceSelector
        sendCategory={props.sendPictureCategory}
        categoryName='Bilder'
        alternative1='Animals'
        alternative2='Cats'
        alternative3='Rats'
      />
    </div>
  );
};

export default Sidebar;
