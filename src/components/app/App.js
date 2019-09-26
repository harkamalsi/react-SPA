import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';
import { file } from '@babel/types';

const url = "https://raw.githubusercontent.com/Emanuele96/prosjekt2_data/master/";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //isWelcomeScreen = true,
      //Selected category
      textCategory: null,
      pictureCategory: null,
      soundCategory: null,
      soundTrack: null,
      //Selected tab value
      selectedTab: null,
      combinations: null,
      saved_resources : {},
    };
    //this.saved_resources = {}
  }

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };

  getSnapshotBeforeUpdate(){
    //If the component has been updated and a tab is selected, so fetch the data
    if (this.state.selectedTab !== null){
      this.fetchText();
      this.fetchPictures();
    }
  }
   
  handleTabClick = e => {
    // e.target.value will help us decide which combination to show on the mainDisplay component.
    this.setState({ selectedTab: e.target.value });
  };
  //Props passed down to sidebar that will update app state with the selected categories
  updateTextCategory = text => {
    this.setState({
      textCategory: text
    });
  };
  updatePictureCategory = picture => {
    this.setState({
      pictureCategory: picture
    });
  };
  updateSoundCategory = sound => {
    this.setState({
      soundCategory: sound,
      soundTrack: 1
    });
  };

  handleFavorite = () => {
    if (localStorage.getItem('combinations') != null) {
      localStorage.removeItem('combinations');
      this.setState({ combinations: [] });
      console.log(this.state.combinations);
    }

    const combinations = ['test1', 'test2', 'test3'];
    localStorage.setItem('combinations', JSON.stringify(combinations));
    this.setState({ combinations });
  };

  getFavorites = () => {
    console.log(this.state.combinations);
  };
//Fetching of text if has not been fetched already
//The logic works as intended and the behavior can be monitored in the browser console
  fetchText(){
    let filename = this.state.textCategory.toLowerCase() + "_" + this.state.selectedTab;
    let key = "text_data_" + filename; //The id of the data in the saved resources
    if (this.state.saved_resources[key] === undefined){                   //If data doesn´t exist in the saved resources, fetch
      console.log("Fetching text data...");
      console.log(url + filename + ".json");
      fetch( url + filename + ".json") 
        .then(res => res.json())
        .then(
          (result) =>{
            console.log("Text Data retrieved from server");
            this.state.saved_resources[key] = [result.title, result.text];
            this.setState({
              saved_resources : this.state.saved_resources,
            });
          },
          (error) =>{
            console.log(error, "Error while loading textdata from server"); //catch an error and throw a fail message
          }
        )
      }
      else{
        console.log("Text data already fetched")
      }
  }
  //Metod for fetching of pictures, similar behavior of fetchText()
  fetchPictures(){
    //The filename of the picture on server
    let filename = this.state.pictureCategory.toLowerCase() + "_" + this.state.selectedTab; 
    let key = "image_data_" + filename;                                                   
    if (this.state.saved_resources[key]===undefined){
      console.log("Fetching Picture data...");
      //console.log(url + filename +".svg");
      fetch(url + filename +".svg")
        .then(res => res.text())
        .then(
          (result) => {
            if(result === "404: Not Found\n"){
              console.log("Picture data not found on Server");
            }
            else{
              console.log("Picture Data retrieved from server with success!");
              this.state.saved_resources[key] = result;
              this.setState({
                saved_resources : this.state.saved_resources,
              });
            }
          },
          (error) => {
            console.log(error, "Error while loading picture data from server");
          }
        )
    }
    else{
      console.log("Picture data already fetched")
    }
  }
  sendDataToVisualize(){
    console.log(Object.keys(this.state.saved_resources).length);
    if (this.state.selectedTab===null || Object.keys(this.state.saved_resources).length === 0)
      return null;
    console.log(this.state.saved_resources);
    let picture_data = this.state.saved_resources["image_data_" + this.state.pictureCategory.toLowerCase() + "_" + this.state.selectedTab];
    let text_data = this.state.saved_resources["text_data_" + this.state.textCategory.toLowerCase() + "_" + this.state.selectedTab];
    console.log([picture_data, text_data]);

    if(picture_data !== undefined && text_data !== undefined){
      return [picture_data, text_data];}
    else
      return null;
  }
  render() {
    return (
      <div className='app'>
        
        <main>
          <div className="grid-container">
            <div className="tabs-bar">
              <Tabdisplay onClick={this.handleTabClick} selectedTab={this.state.selectedTab} />
            </div>
              <div className="maindisp">
              <Maindisplay
                selectedTab={this.state.selectedTab}
                soundCategory={this.state.soundCategory}
                soundTrack={this.state.soundTrack}
                handleFavorite={this.handleFavorite}
                getFavorites={this.getFavorites}
                deleteFavorite={this.deleteFavorite}
                isWelcomeScreen={this.selectedTab===null}
                data = {this.sendDataToVisualize()}
              />
              </div>
              <div className="sidebar-category">
              <Sidebar
                sendTextCategory={this.updateTextCategory}
                sendPictureCategory={this.updatePictureCategory}
                sendSoundCategory={this.updateSoundCategory}
              />
              </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
