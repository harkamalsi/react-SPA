import React from 'react';
import './Maindisplay.css';
import AudioPlayer from '../soundform/AudioPlayer';
import loading from './loading.svg';

//Functional component that visualized data passed down from App.
//It has 3 screens: 
//    - WelcomeScreen : Is visualized if App is on the welcome screen
//    - LoadingScreen : Is Visualizing if App is not on welcom screen but data is not ready yet
//    - Data : Visualizing the data (picture, text and sound)

const Maindisplay = props => {
  if (props.isWelcomeScreen)
    return <WelcomeMessage selectedTab={props.selectedTab} />;
  else if (props.data === null)
    return (
      <div>
        <div className='text'>Laster inn data...</div>
        <div className='loading'>
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
      </div>
    );
  }
};

const WelcomeMessage = props => {
  return (
    <div className='welcomemsg'>
      <h2>Velkommen!</h2>
      <p>
        Vennligst velg tre kategorier per medietype i vindu til høyre og trykk
        på en tab for å lage en kombinasjon.
      </p>
    </div>
  );
};


export default Maindisplay;
