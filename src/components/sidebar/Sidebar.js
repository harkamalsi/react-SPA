import React from 'react';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';
import './Sidebar.css';

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
        categoryName='Text'
        alternative1='Christmas'
        alternative2='Valentine'
        alternative3='Get Well'
      />
      <ChoiceSelector
        sendCategory={props.sendPictureCategory}
        categoryName='Picture'
        alternative1='Dogs'
        alternative2='Cats'
        alternative3='Rats'
      />
      <div className='undo-redo'>
        <i onClick={props.handleUndo} class='material-icons'>
          undo
        </i>
        <i onClick={props.handleRedo} class='material-icons'>
          redo
        </i>
      </div>
    </div>
  );
};

export default Sidebar;
