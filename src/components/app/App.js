import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

const url = "https://raw.githubusercontent.com/Emanuele96/prosjekt2_data/master/";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Selected category
      textCategory: null,
      pictureCategory: null,
      soundCategory: null,
      soundTrack: null,
      //Selected tab value
      selectedTab: null,
      //Middle storage for local storage favorite combinations
      combinations: null,
    };
    //Saved resourrces are implemented as a dictionary where the key is been tested at the moment of 
    //fetching of data
    this.saved_resources = {}
  }

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };

  componentDidUpdate(){
    //If the component has been updated and a tab is selected, so fetch the data
    if (this.state.selectedTab != null){
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
    let key = "text_data_" + this.state.textCategory.toLowerCase(); //The id of the data in the saved resources
    if (this.saved_resources[key] === undefined){                   //If data doesn´t exist in the saved resources, fetch
      console.log("Fetching text data...")
      fetch( url + this.state.textCategory.toLowerCase() + ".json") 
        .then(res => res.json())
        .then(
          (result) =>{
            console.log("Text Data retrieved from server");
            this.saved_resources[key] = result.data;
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
    if (this.saved_resources[key]===undefined){
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
              this.saved_resources[key] = result;
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
  render() {
    return (
      <div className='App'>
        <header>
          <div>
            <h1>This is header</h1>
          </div>
        </header>
        <main>
          <div className='Box'>
            <Tabdisplay onClick={this.handleTabClick} />
            <div className='InnerBox'>
              <Maindisplay
                selectedTab={this.state.selectedTab}
                soundCategory={this.state.soundCategory}
                soundTrack={this.state.soundTrack}
                handleFavorite={this.handleFavorite}
                getFavorites={this.getFavorites}
                deleteFavorite={this.deleteFavorite}
              />
              <Sidebar
                sendTextCategory={this.updateTextCategory}
                sendPictureCategory={this.updatePictureCategory}
                sendSoundCategory={this.updateSoundCategory}
              />
            </div>
          </div>
        </main>
        <footer>
          <h2>This is footer</h2>
        </footer>
      </div>
    );
  }
}

export default App;
