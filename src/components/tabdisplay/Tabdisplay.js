import React from 'react';
import { Link } from 'react-router-dom';
import './Tabdisplay.css';

function Tabdisplay(props) {
  return (
    <div className='Tabdisplay'>
      <Link to='/1'>
        <button
          className='combination'
          id='combination1'
          value={1}
          onClick={props.onClick}
        >
          Kombinasjon1
        </button>
      </Link>
      <Link to='/2'>
        <button
          className='combination'
          id='combination2'
          onClick={() => handleClick('Kombi2')}
        >
          Kombinasjon2
        </button>
      </Link>
      <Link to='/3'>
        <button
          className='combination'
          id='combination3'
          onClick={() => handleClick('Kombi3')}
        >
          Kombinasjon3
        </button>
      </Link>
      <Link to='/4'>
        <button
          className='combination'
          id='combination4'
          onClick={() => handleClick('Kombi4')}
        >
          Kombinasjon4
        </button>
      </Link>
    </div>
  );
}

const handleClick = props => {
  console.log(props);
};

export default Tabdisplay;
