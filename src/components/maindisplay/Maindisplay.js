import React from 'react';
import './Maindisplay.css';

const Maindisplay = props => {
  return <WelcomeMessage number={props.number} />;
};

const WelcomeMessage = props => {
  return (
    <div className='Maindisplay'>
      <h2>Velkommen til kombimaskinen nr {props.number}!</h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre.</p>
    </div>
  );
};

export default Maindisplay;
