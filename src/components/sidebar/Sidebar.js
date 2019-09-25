import React, { useState, useEffect } from 'react';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';
import Button from '../ui/button/Button';
import './Sidebar.css';

const Sidebar = props => {
  // works as componentDidUpdate for sidebar
  const [isUndoDisable, setUndoDisable] = useState(true);
  const [isRedoDisable, setRedoDisable] = useState(true);

  const [checkBoxCategories, setCheckBoxCategories] = useState(
    props.getCheckboxCategories
  );

  useEffect(() => {
    props.onChange();
    // console.log('useEffect fired');
    /* setUndoDisable(props.isUndoEmpty);
    setRedoDisable(props.isRedoEmpty); */

    /* console.log('undoLengthEmpty: ', isUndoDisable);
    console.log('redoLengthEmpty: ', isRedoDisable); */
  }, [props]);

  const handleUndoOnClick = () => {
    props.handleUndo();
    setCheckBoxCategories(props.getCheckboxCategories);
    console.log(props.getCheckboxCategories && props.getCheckboxCategories);
  };

  return (
    <div className='Sidebar'>
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
          // disable the undo button if the length is <= 1. We don't want to undo the first default move; the first element is the default move.
          onClick={props.handleUndo}
          handleDisabled={props.isUndoEmpty}
          icon={'undo'}
          text={'Angre'}
        />

        <Button
          id='redo'
          // disable the undo button if the length is <= 1. We don't want to undo the first default move; the first element is the default move.
          onClick={props.handleRedo}
          handleDisabled={props.isRedoEmpty}
          icon={'redo'}
          text={'Gjenta'}
        />
        {/* <button
          id='undo'
          className='undo-redo-btn'
          // disable the undo button if the length is <= 1. We don't want to undo the first default move; the first element is the default move.
          onClick={props.handleUndo}
          disabled={isUndoEmpty}
        >
          <i class='material-icons'>undo</i>
          Angre
        </button>
        <button
          id='redo'
          className='undo-redo-btn'
          // disable the redo button if the length is == 0. Then there is nothing to redo.
          onClick={props.handleRedo}
          disabled={isRedoEmpty}
        >
          <i class='material-icons'>redo</i>
          Gjenta
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
