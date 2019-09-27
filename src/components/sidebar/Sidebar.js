import React from 'react';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';
import Button from '../ui/button/Button';
import './Sidebar.css';

//Sidebar it´s the parent component of the 3 choiceSelector components and undo redo buttons that build the gui.
//It´s a functional component and an interface between the app and the ChoiceSelector componets.
//It´s main purpouse is to render the Choice Selector and pass down the props for changing state values of App from the ChoiceSelector

const Sidebar = props => {
  return (
    <div className='sidebar'>
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
      <h3>Kategorier</h3>
      <ChoiceSelector
        sendCategory={props.updateSoundCategory}
        categoryName='Lyd'
        alternative1='Naturen'
        alternative2='Piano'
        alternative3='By liv'
        select={props.getCheckboxCategories && props.getCheckboxCategories[0]}
      />
      <ChoiceSelector
        sendCategory={props.updateTextCategory}
        categoryName='Tekst'
        alternative1='Emosjoner'
        alternative2='Farger'
        alternative3='Dyr'
        select={props.getCheckboxCategories && props.getCheckboxCategories[1]}
      />
      <ChoiceSelector
        categoryName='Bilder'
        alternative1='Dyr'
        alternative2='Biler'
        alternative3='Utenomjordisk'
        sendCategory={props.updatePictureCategory}
        select={props.getCheckboxCategories && props.getCheckboxCategories[2]}
      />
    </div>
  );
};

export default Sidebar;
