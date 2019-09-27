import React from 'react';
import './Button.css';

//Functional component button with propriety of displaying the status by beeing enabled or disabled.
function Button(props) {
  return (
    <button
      id={props.id}
      className={'btn ' + props.className}
      onClick={props.onClick}
      disabled={props.handleDisabled}
    >
      <div className='inner-btn-container'>
        {true && <i className='material-icons'>{props.icon}</i>}
        {true && <span>{props.text}</span>}
      </div>
    </button>
  );
}
export default Button;
