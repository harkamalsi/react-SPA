import React from 'react';
import './Maindisplay.css';
import { AudioPlayer } from '../soundform/Soundform';

const Maindisplay = props => {
  console.log(props.combi);
  return <WelcomeMessage combi={props.combi} />;
};

const WelcomeMessage = props => {
  return (
    <div className='Maindisplay'>
      <h2>Velkommen! {props.combi && `Kombinasjon: ${props.combi}`}</h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre.</p>
      <AudioPlayer combination={props.number} category={props.category} />
    </div>
  );
};

export default Maindisplay;
