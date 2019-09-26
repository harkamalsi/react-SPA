import React from 'react';
import './Maindisplay.css';
import AudioPlayer from '../soundform/AudioPlayer';


class Maindisplay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      picture : this.props.picture,
      text : this.props.text,
    }
  }

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
}
/*
const feedingValidData =(picture, text) =>{
  console.log(picture);
  if (picture === null)
    picture = "";
  if (text === null)
    text = "";
  return picture, text;
  };   

const Maindisplay = props => {
  this.forceUpdate();
  let picture, text = feedingValidData(props.picture, props.picture);
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
};

const WelcomeMessage = props => {
  return (
    <div>
      <h2>
        Velkommen! {props.selectedTab && `Kombinasjon: ${props.selectedTab}`}
      </h2>
      <p>Vennligst velg tre kategorier per medietype i vindu til høyre.</p>
      <AudioPlayer
        soundTrack={props.selectedTab}
        soundCategory={props.soundCategory}
      />
    </div>
  );
};
*/
export default Maindisplay;
