import React from 'react';
import './Maindisplay.css';
import Soundform from '../soundform/Soundform';



class Maindisplay extends React.Component {

  renderSoundform(){
    return <Soundform file={"nature1"}  />
  }

  
  loadAudio = () => {
    let audioPlayer = document.getElementById("audioPlayer")
    audioPlayer.load() 
  }

  render () {
    return (
      <div className='Maindisplay'>
      <h2>Velkommen! {this.props.number && `Kombinasjon: ${this.props.number}`}</h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre.</p>
      {this.renderSoundform()}
      {this.loadAudio}
    </div>
    );
  }
}

export default Maindisplay;
