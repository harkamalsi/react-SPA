import React from 'react';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';
import Button from '../ui/button/Button';
import './Sidebar.css';

//Sidebar it´s the parent component of the 3 choiceSelector components that build the gui.
//It´s a functional component and an interface between the app and the ChoiceSelector componets.
//It´s main purpouse is to render the Choice Selector and pass down the props for changing state values of App from the ChoiceSelector

const Sidebar = props => {
  return (
    <div className='sidebar'>
      <h3>Kategorier</h3>
      <ChoiceSelector
        sendCategory={props.updateSoundCategory}
        categoryName='Sound'
        alternative1='Nature'
        alternative2='Piano'
        alternative3='City Life'
        select={props.getCheckboxCategories && props.getCheckboxCategories[0]}
      />
      <ChoiceSelector
        sendCategory={props.updateTextCategory}
        categoryName='Text'
        alternative1='Christmas'
        alternative2='Valentine'
        alternative3='Get Well'
        select={props.getCheckboxCategories && props.getCheckboxCategories[1]}
      />
      <ChoiceSelector
        sendCategory={props.updatePictureCategory}
        categoryName='Picture'
        alternative1='Dogs'
        alternative2='Cats'
        alternative3='Rats'
        select={props.getCheckboxCategories && props.getCheckboxCategories[2]}
      />
      <div className='undo-redo-buttons'>
        <Button
          id='undo'
          onClick={props.handleUndo}
          handleDisabled={props.isUndoEmpty}
          icon={'undo'}
          text={'Angre'}
        />

        <Button
          id='redo'
          onClick={props.handleRedo}
          handleDisabled={props.isRedoEmpty}
          icon={'redo'}
          text={'Gjenta'}
        />
      </div>
    </div>
  );
};

export default Sidebar;
