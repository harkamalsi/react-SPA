import React, { Component } from 'react';
import './Soundform.css';
//import music from '../../assets/sounds/';
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

//music + Math.ceil(Math.random()*4) + '.mp3'

const pianoSongs = [piano1, piano2, piano3, piano4];
const natureSounds = [nature1, nature2, nature3, nature4];
const citylifeSounds = [citylife1, citylife2, citylife3, citylife4];

var category;

const AudioPlayer = props => {
  let soundTrack = props.soundTrack;
  console.log('Category: ' + category + ' Combination: ' + props.combination);

  if (category === 'nature') {
    soundTrack = natureSounds[props.combination - 1];
  } else if (category === 'piano') {
    soundTrack = pianoSongs[props.combination - 1];
  } else if (category === 'citylife') {
    soundTrack = citylifeSounds[props.combination - 1];
  }

  return (
    <div className='sound'>
      {console.log(soundTrack)}
      <audio
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

const Soundform = props => {
  return (
    <div className='catForm'>
      <h3>Lyd</h3>
      <form>
        <label>
          Nature
          <input
            type='radio'
            value='nature'
            onChange={() => {
              category = 'nature';
            }}
            name='category'
          />
        </label>

        <label>
          Piano
          <input
            type='radio'
            value='piano'
            onChange={() => {
              category = 'piano';
            }}
            name='category'
          />
        </label>

        <label>
          Citylife
          <input
            type='radio'
            value='citylife'
            onChange={() => {
              category = 'citylife';
            }}
            name='category'
          />
        </label>
      </form>
    </div>
  );
};

export { Soundform, AudioPlayer };

/*
class Soundform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
            category: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(event) {
        let category = event.target.value;
        var soundTrack;
        if (category === "nature"){
            soundTrack = this.getSong(natureSounds);
        } else if (category === "piano"){
            soundTrack = this.getSong(pianoSongs);
        } else {
            soundTrack = this.getSong(citylifeSounds)
        }
        this.setState({ song: soundTrack, category: event.target.value });

        console.log(this.state.song);

        let audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.load();
    }

    // velger tilfeldig sang fra en av listene
    getSong(category){
        return category[Math.floor(Math.random() * 4)];
    }

    render() {
        return (
            <div className='sound'>
                <div className='sounds category'>
                    <h3>Lyd</h3>
                    <form>
                        <label>
                            Nature
                            <input type="radio" value="nature" onChange={this.handleChange} name="category" />
                        </label>

                        <label>
                            Piano
                            <input type="radio" value="piano" onChange={this.handleChange} name="category" />
                        </label>

                        <label>
                            Citylife
                            <input type="radio" value="citylife" onChange={this.handleChange} name="category" />
                        </label>
                    </form>
                </div>
                <audio id="audioPlayer" src={this.state.song} type="audio/mpeg" controls loop/>
            </div>
        );
    }
}

export default Soundform;
*/
