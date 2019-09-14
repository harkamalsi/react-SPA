import React from 'react';
import './Tabdisplay.css';

function Tabdisplay(props) {
  return (
    <div className='Tabdisplay'>
      <button
        className='combination'
        id='combination1'
        value={1}
        onClick={props.onClick}
      >
        Kombinasjon1
      </button>
      <button
        className='combination'
        id='combination2'
        value={2}
        onClick={props.onClick}
      >
        Kombinasjon2
      </button>
      <button
        className='combination'
        id='combination3'
        value={3}
        onClick={props.onClick}
      >
        Kombinasjon3
      </button>
      <button
        className='combination'
        id='combination4'
        value={4}
        onClick={props.onClick}
      >
        Kombinasjon4
      </button>
    </div>
  );
}

export default Tabdisplay;
