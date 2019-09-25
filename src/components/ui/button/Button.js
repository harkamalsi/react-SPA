import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button
      id={props.id}
      className={'btn ' + props.className}
      onClick={props.onClick}
      disabled={props.handleDisabled()}
    >
      <div className='inner-btn-container'>
        {true && <i class='material-icons'>{props.icon}</i>}
        {true && <span>{props.text}</span>}
      </div>
    </button>
  );
}

export default Button;
