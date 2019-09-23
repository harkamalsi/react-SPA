import React from 'react';
<<<<<<< HEAD
import './Sidebar.css';
=======
>>>>>>> c4852ad9af6dc790cd7f164c81a18af4c5161f6e
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
<<<<<<< HEAD
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
=======
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
>>>>>>> c4852ad9af6dc790cd7f164c81a18af4c5161f6e
    </div>
  );
};

export default Sidebar;
