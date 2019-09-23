import React from 'react';
import './Sidebar.css';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';

const Sidebar = props => {
  return (
    <div className='Sidebar'>
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
        categoryName='Picture'
        alternative1='Dogs'
        alternative2='Cats'
        alternative3='Rats'
      />
    </div>
  );
};

export default Sidebar;
