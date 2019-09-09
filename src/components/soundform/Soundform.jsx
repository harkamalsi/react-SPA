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

var pianoSongs = [piano1, piano2, piano3, piano4];
var natureSounds = [nature1, nature2, nature3, nature4];
var citylifeSounds = [citylife1, citylife2, citylife3, citylife4];



class Soundform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
            category: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event){
        alert('Value Updated: ' + event.target.value + " From: " + event.target.name);
        this.setState({song: event.target.value, category: event.target.name});        
        console.log(this.state.song);
        let audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.load();
        
    }

    render() {
        return (
            <div className='sound'>
                <div className='sounds category'>
                    <h3>Lyd</h3>
                    <form>
                        <label>
                            Nature
                            <input type="radio" value={natureSounds[Math.floor(Math.random() * 4)]} checked={this.state.category == 'nature'} onChange={this.handleChange} name="nature"/>
                        </label>

                        <label>
                            Piano
                            <input type="radio" value={pianoSongs[Math.floor(Math.random() * 4)]} checked={this.state.category == 'piano'} onChange={this.handleChange} name="piano"/>
                        </label>

                        <label>
                            Citylife
                            <input type="radio" value={citylifeSounds[Math.floor(Math.random() * 4)]} checked={this.state.category == 'citylife'} onChange={this.handleChange} name="citylife"/>
                        </label>
                    </form>
                </div>

                <audio id="audioPlayer" src={this.state.song} type="audio/mpeg" controls loop>
                </audio>
            </div>
        );
    }
}

export default Soundform;
