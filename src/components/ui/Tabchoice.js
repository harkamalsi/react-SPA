import React from 'react';
import './Tabchoice.css';

const Tabchoice = props => {
  return (
    <div className='tabchoice'>
      <button
        className='combination'
        id={`combination${props.tabNumber}`}
        value={props.value}
        onClick={props.onClick}
      >
        {`Kombinasjon ${props.tabNumber}`}
      </button>
    </div>
  );
};

export default Tabchoice;
