import React from 'react';

import './AudioPlayer.css' 
import piano1 from '../../assets/sounds/piano/1.mp3';
import piano2 from '../../assets/sounds/piano/2.mp3';
import piano3 from '../../assets/sounds/piano/3.mp3';
import piano4 from '../../assets/sounds/piano/4.mp3';
import nature1 from '../../assets/sounds/nature/1.mp3';
import nature2 from '../../assets/sounds/nature/2.mp3';
import nature3 from '../../assets/sounds/nature/3.mp3';
import nature4 from '../../assets/sounds/nature/4.mp3';
import citylife1 from '../../assets/sounds/citylife/1.mp3';
import citylife2 from '../../assets/sounds/citylife/2.mp3';
import citylife3 from '../../assets/sounds/citylife/3.mp3';
import citylife4 from '../../assets/sounds/citylife/4.mp3';


const pianoSongs = [piano1, piano2, piano3, piano4];
const natureSounds = [nature1, nature2, nature3, nature4];
const citylifeSounds = [citylife1, citylife2, citylife3, citylife4];

const AudioPlayer = props => {
  let soundTrack;
  let soundCategory = props.soundCategory;

  if (soundCategory === 'Nature') {
    soundTrack = natureSounds[props.soundTrack - 1];
  } else if (soundCategory === 'Piano') {
    soundTrack = pianoSongs[props.soundTrack - 1];
  } else if (soundCategory === 'City Life') {
    soundTrack = citylifeSounds[props.soundTrack - 1];
  }

  return (
    <div className='sound'>
      <audio
        className='soundPlayer'
        preload='auto'
        src={soundTrack}
        type='audio/mpeg'
        controls
        loop
        autoPlay
      />
    </div>
  );
};

export default AudioPlayer;
