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
      textCategory: null,
      pictureCategory: null,
      soundCategory: null,
      soundTrack: null,
      selectedTab: null,
      combinations: null,
    };
    this.saved_resources = {}
  }

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };
  /*shouldComponentUpdate(nextProps, nextState){
    return this.state.textCategory !== nextState.textCategory || this.state.pictureCategory !== nextState.pictureCategory || this.state.soundCategory !== nextState.soundCategory || this.state.selectedTab !== nextState.selectedTab;

  }*/
  componentDidUpdate(){
    if (this.state.selectedTab != null){
      this.fetchText();
      console.log(this.saved_resources)
    }
    }
   

  handleTabClick = e => {
    // e.target.value will help us decide which comibation to show on the mainDisplay component.
    this.setState({ selectedTab: e.target.value });
  };
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

  fetchText(){
    let key = "text_data_" + this.state.textCategory.toLowerCase();
    if (this.saved_resources[key] === undefined){
      console.log("Fetching data...")
      fetch( url + this.state.textCategory.toLowerCase() + ".json")
        .then(res => res.json())
        .then(
          (result) =>{
            console.log("Data retrieved from server");
            this.saved_resources[key] = result.data;
          },
          (error) =>{
            console.log(error, "error while loading textdata from server");
          }
        )
      }
      else{
        console.log("Data already fetched")
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
