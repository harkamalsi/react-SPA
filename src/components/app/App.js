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
<<<<<<< HEAD
      soundTrack: null,
      selectedTab: null,
      combinations: null,
=======
      pictureFilePath: null,
      textFilePath: null,
      soundFilePath: null,
      selectedTab: null,
      combinations: null
>>>>>>> c4852ad9af6dc790cd7f164c81a18af4c5161f6e
    };
    this.saved_resources = {}
  }

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };
<<<<<<< HEAD
  /*shouldComponentUpdate(nextProps, nextState){
    return this.state.textCategory !== nextState.textCategory || this.state.pictureCategory !== nextState.pictureCategory || this.state.soundCategory !== nextState.soundCategory || this.state.selectedTab !== nextState.selectedTab;

  }*/
  componentDidUpdate(){
    if (this.state.selectedTab != null){
      this.fetchText();
      this.fetchPictures();
      console.log(this.saved_resources)
    }
    }
   
=======

>>>>>>> c4852ad9af6dc790cd7f164c81a18af4c5161f6e
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
      soundCategory: sound
    });
    this.handleSession();
  };

  // save the categories chosen in the sidebar in the undo stack
  handleSession = () => {
    // pop and push. Stack consisting of two arrays.

    let undoArr = [];

    let categories = {
      //selectedTab: this.state.selectedTab,
      soundCategory: this.state.soundCategory,
      soundFilePath: this.state.soundFilePath,
      textCategory: this.state.textCategory,
      textFilePath: this.state.textFilePath,
      pictureCategory: this.state.pictureCategory,
      pictureFilePath: this.state.pictureFilePath
    };

    // categories should be saved in sessioStorage first when they are displayed. soundCategory could also be textCategory or pictureCategory
    if (
      (categories.soundCategory,
      categories.textCategory,
      categories.pictureCategory)
    ) {
      if (sessionStorage.getItem('categoriesUndo')) {
        undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
        // push the element to the end of undoArr
        undoArr.push(categories);
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        console.log('new categories-element pushed into undoArr');
      } else {
        // push the element to the end of undoArr
        undoArr.push(categories);
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        console.log('new categories-element pushed into undoArr');
      }
    }
    console.log('undoArrStack: ', undoArr);
  };

  handleUndo = () => {
    // There must be an undo array after handleSession()
    let undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    if (!redoArr) {
      if (undoArr && undoArr.length > 0) {
        // pops the last element in undoArr
        let redoArr = [undoArr.pop()];
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
        console.log('undoArr popped into newly created redoArr');
      }
    } else {
      if (undoArr && undoArr.length > 0) {
        let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));
        // pops the last element in redoArr
        redoArr.push(undoArr.pop());
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
        console.log('undoArr popped into previously created redoArr');
      }
    }

    let undoArr2 = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr2 = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    console.log({ undoArr2 });
    console.log({ redoArr2 });
  };

  // NOT FINISHED YET!!!!
  handleRedo = () => {
    let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    if (redoArr && redoArr.length > 0) {
      let undoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));
      undoArr.push(redoArr.pop());
      sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
      console.log('redoArr popped into undoArr');
    }

    let undoArr3 = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr3 = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    console.log({ undoArr3 });
    console.log({ redoArr3 });
  };

  handleFavorite = () => {
    if (localStorage.getItem('combinations')) {
      localStorage.removeItem('combinations');
      this.setState({ combinations: [] });
    }

    const combinations = {
      selectedTab: this.state.selectedTab,
      pictureCategory: this.state.pictureCategory,
      pictureFilePath: this.state.pictureFilePath,
      soundCategory: this.state.soundCategory,
      soundTrack: this.state.soundTrack,
      textCategory: this.state.textCategory,
      textFilePath: this.state.text
    };
    this.setState({ combinations });
    localStorage.setItem('combinations', JSON.stringify(combinations));
  };

  getFavorites = () => {
    console.log(this.state.combinations);
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
      console.log("Fetching text data...")
      fetch( url + this.state.textCategory.toLowerCase() + ".json")
        .then(res => res.json())
        .then(
          (result) =>{
            console.log("Text Data retrieved from server");
            this.saved_resources[key] = result.data;
          },
          (error) =>{
            console.log(error, "Error while loading textdata from server");
          }
        )
      }
      else{
        console.log("Text data already fetched")
      }
  }
  fetchPictures(){
    let filename = this.state.pictureCategory.toLowerCase() + "_" + this.state.selectedTab;
    let key = "image_data_" + filename;
    if (this.saved_resources[key]===undefined){
      console.log("Fetching Picture data...");
      console.log(url + filename +".svg");
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
<<<<<<< HEAD
                soundTrack={this.state.soundTrack}
=======
>>>>>>> c4852ad9af6dc790cd7f164c81a18af4c5161f6e
                handleFavorite={this.handleFavorite}
                getFavorites={this.getFavorites}
                deleteFavorite={this.deleteFavorite}
              />
              <Sidebar
                onChange={this.handleSession}
                handleUndo={this.handleUndo}
                handleRedo={this.handleRedo}
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
