import React from 'react';
import './Tabchoice.css';

const Tabchoice = props => {
  return (
    <div className='tabchoice'>
      <button
        className={`combination${props.selectedTab == props.id ? ' show' : ''}`}
        id={`combination${props.id}`}
        value={props.value}
        onClick={props.onClick}
      >
        Kombinasjon {props.id}
      </button>
    </div>
  );
};

export default Tabchoice;
