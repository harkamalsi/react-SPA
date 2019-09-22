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
        
        <div><span id="tab-text">Kombinasjon</span> {props.tabNumber}</div>
        

      </button>
    </div>
  );
};

export default Tabchoice;
