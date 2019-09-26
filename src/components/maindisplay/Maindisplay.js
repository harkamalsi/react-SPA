import React from 'react';
import './Maindisplay.css';
import AudioPlayer from '../soundform/AudioPlayer';

/*
class Maindisplay extends React.Component{

  

  render(){
    if (this.props.isWelcomeScreen)
    return(
      <div>Velkommen</div>
    )
    else if (this.props.data === null)
      return(
        <div></div>
      )
      else{ 
    return(
      <div>
      <div dangerouslySetInnerHTML ={{__html: this.props.data[1][0]}}></div>
      <div dangerouslySetInnerHTML ={{__html: this.props.data[0]}}></div>
      <div dangerouslySetInnerHTML ={{__html: this.props.data[1][1]}}></div>
      </div>
    );}

  }
}*/
const WelcomeMessage = props => {
  return (
    <div>
      <h2>
        Velkommen! {props.selectedTab && `Kombinasjon: ${props.selectedTab}`}
      </h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre og trikk på en tab for å lage en kombinasjon.</p>

    </div>
  );
};

const Maindisplay = props => {

  if (props.isWelcomeScreen)
  return(
    <WelcomeMessage
      selectedTab={props.selectedTab}
    />
  )
  else if (props.data === null)
    return(
      <div></div>
    )
    else{ 
  return(
    <div>
    <div dangerouslySetInnerHTML ={{__html: props.data[1][0]}}></div>
    <div dangerouslySetInnerHTML ={{__html: props.data[0]}}></div>
    <div dangerouslySetInnerHTML ={{__html: props.data[1][1]}}></div>
    <AudioPlayer
        soundTrack={props.selectedTab}
        soundCategory={props.soundCategory}
      />
    </div>
  );}
} /*
  return (


    <div className='maindisplay'>
      <WelcomeMessage
        selectedTab={props.selectedTab}
        soundCategory={props.soundCategory}
        soundTrack={props.soundTrack}
      />
      <div dangerouslySetInnerHTML={{__html: {picture}}}>
      </div>
      <div className='favorite-buttons'>
        {/* <button className='btn delete' onClick={props.deleteFavorite}>
          <h3>Slett favoritt kombinasjon</h3>
        </button> *//*}
        <button className='btn delete' onClick={props.getFavorites}>
          <h3>Hent favoritt kombinasjon</h3>
        </button>
        <button className='btn favorite' onClick={props.handleFavorite}>
          <h3>Lagre Kombinasjon</h3>
        </button>
      </div>
    </div>
  );
}*/


export default Maindisplay;
