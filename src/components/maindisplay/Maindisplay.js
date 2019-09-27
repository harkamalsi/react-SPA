import React from 'react';
import './Maindisplay.css';
import AudioPlayer from '../soundform/AudioPlayer';
import loading from './loading.svg';

const WelcomeMessage = props => {
  return (
    <div>
      <h2>Velkommen!</h2>
      <p>
        Vennligst velg tre kategorier per medietype i vindu til høyre og trykk
        på en tab for å lage en kombinasjon.
      </p>
    </div>
  );
};

const Maindisplay = props => {
  if (props.isWelcomeScreen)
    return <WelcomeMessage selectedTab={props.selectedTab} />;
  else if (props.data === null)
    return (
      <div>
        <div className='text'>Laster inn data...</div>
        <div className='picture'>
          {' '}
          <img src={loading} alt='' />
        </div>
      </div>
    );
  else {
    return (
      <div>
        <div
          className='title'
          dangerouslySetInnerHTML={{ __html: props.data[1][0] }}
        ></div>
        <div
          className='picture'
          dangerouslySetInnerHTML={{ __html: props.data[0] }}
        ></div>
        <div
          className='text'
          dangerouslySetInnerHTML={{ __html: props.data[1][1] }}
        ></div>
        <AudioPlayer
          soundTrack={props.selectedTab}
          soundCategory={props.soundCategory}
        />
        <button className='btn delete' onClick={props.getFavorites}>
          <h3>Hent favoritt kombinasjon</h3>
        </button>
        <button className='btn favorite' onClick={props.handleFavorite}>
          <h3>Lagre Kombinasjon</h3>
        </button>
      </div>
    );
  }
};

export default Maindisplay;
