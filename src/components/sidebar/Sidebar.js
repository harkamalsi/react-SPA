import React, { useEffect } from 'react';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';
import './Sidebar.css';

const Sidebar = props => {
  let isUndoEmpty = props.isUndoEmpty();
  let isRedoEmpty = props.isRedoEmpty();
  console.log(isUndoEmpty, isRedoEmpty);

  const updateButtonDisableValue = () => {
    isUndoEmpty = props.isUndoEmpty();
    isRedoEmpty = props.isRedoEmpty();
  };

  // works as componentDidUpdate for sidebar
  useEffect(() => {
    props.onChange();

    // following makes sure to update the values for undoButton and redoButton
    updateButtonDisableValue();
  });

  return (
    <div className='Sidebar'>
      <h3>Kategorier</h3>
      <ChoiceSelector
        sendCategory={props.updateSoundCategory}
        categoryName='Sound'
        alternative1='Nature'
        alternative2='Piano'
        alternative3='City Life'
      />

      <ChoiceSelector
        sendCategory={props.updateTextCategory}
        categoryName='Text'
        alternative1='Christmas'
        alternative2='Valentine'
        alternative3='Get Well'
      />
      <ChoiceSelector
        sendCategory={props.updatePictureCategory}
        categoryName='Picture'
        alternative1='Dogs'
        alternative2='Cats'
        alternative3='Rats'
      />
      <div className='undo-redo-buttons'>
        <button
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
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
