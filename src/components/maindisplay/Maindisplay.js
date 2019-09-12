import React from 'react';
import './Maindisplay.css';
import {AudioPlayer} from '../soundform/Soundform';



class Maindisplay extends React.Component {
  

  renderSoundform(){
    return <AudioPlayer combination={this.props.number} category={this.props.category}  />
  }

  
  

  render () {
    return (
      <div className='Maindisplay'>
      <h2>Velkommen! {this.props.number && `Kombinasjon: ${this.props.number}`}</h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre.</p>
      {this.renderSoundform()}
    </div>
    );
  }
}

export default Maindisplay;
