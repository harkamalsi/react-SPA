import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

const url =
  'https://raw.githubusercontent.com/Emanuele96/prosjekt2_data/master/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundCategory: null,
      soundFilePath: null,
      textCategory: null,
      textFilePath: null,
      pictureCategory: null,
      pictureFilePath: null,
      selectedTab: null,
      combinations: null
    };

    this.undoArr = sessionStorage.getItem('categoriesUndo')
      ? JSON.parse(sessionStorage.getItem('categoriesUndo'))
      : [];

    this.redoArr = sessionStorage.getItem('categoriesRedo')
      ? JSON.parse(sessionStorage.getItem('categoriesRedo'))
      : [];

    this.saved_resources = {};
  }

  createStartScreenData = () => {
    if (this.undoArr.length === 0 && this.state.textCategory !== null) {
      let welcomeScreenCategories = {
        soundCategory: this.state.soundCategory,
        textCategory: this.state.textCategory,
        pictureCategory: this.state.pictureCategory
      };

      this.undoArr.push(welcomeScreenCategories);
    }
  };

  componentDidUpdate = () => {
    if (this.state.selectedTab !== null) {
      let previousCategory = this.undoArr[this.undoArr.length - 1];

      if (
        previousCategory.soundCategory !== this.state.soundCategory ||
        previousCategory.textCategory !== this.state.textCategory ||
        previousCategory.pictureCategory !== this.state.pictureCategory
      ) {
        // change the sesstionStorage and update the state
        this.handleSession();
        this.forceUpdate();
      }
    }

    //If the component has been updated and a tab is selected, so fetch the data
    if (this.state.selectedTab != null) {
      this.fetchText();
      this.fetchPictures();
    }
  };

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };

  handleTabClick = e => {
    // e.target.value will help us decide which combination to show on the mainDisplay component.
    this.setState({ selectedTab: e.target.value });
  };

  //Props passed down to sidebar that will update app state with the selected categories
  updateTextCategory = text => {
    this.setState({ textCategory: text });
  };

  updatePictureCategory = picture => {
    this.setState({ pictureCategory: picture });
  };

  updateSoundCategory = sound => {
    this.setState({ soundCategory: sound });
  };

  // save the categories chosen in the sidebar in the undo stack
  handleSession = () => {
    // pop and push. Stack consisting of two arrays.

    // moves that we will maybe get undoed or redoed
    let categories = {
      soundCategory: this.state.soundCategory,
      textCategory: this.state.textCategory,
      pictureCategory: this.state.pictureCategory
    };

    this.undoArr.push(categories);
    sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
  };

  handleUndo = () => {
    // There must be an undo array after handleSession()

    if (this.undoArr.length > 1) {
      // pushes the last element of undoArr in redoArr
      this.redoArr.push(this.undoArr.pop());

      // change the state pf the categories. Is used for displaying checkbox value.
      let previousCategories = this.undoArr[this.undoArr.length - 1];

      this.setState({
        soundCategory: previousCategories.soundCategory,
        textCategory: previousCategories.textCategory,
        pictureCategory: previousCategories.pictureCategory
      });

      sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(this.redoArr));
    }
  };

  handleRedo = () => {
    if (this.redoArr.length > 0) {
      this.undoArr.push(this.redoArr.pop());

      let currentCategories = this.undoArr[this.undoArr.length - 1];

      // change the state pf the categories. Is used for displaying checkbox value.
      this.setState({
        soundCategory: currentCategories.soundCategory,
        textCategory: currentCategories.textCategory,
        pictureCategory: currentCategories.pictureCategory
      });

      sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(this.redoArr));
    }
  };

  // not used at the moment
  getCheckboxCategories = () => {
    //let undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    let categoriesItem = redoArr ? redoArr[redoArr.length - 1] : null;
    // console.log(categoriesItem);

    console.log(categoriesItem);

    if (categoriesItem)
      return [
        categoriesItem.soundCategory,
        categoriesItem.textCategory,
        categoriesItem.pictureCategory
      ];
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

  //Fetching of text if has not been fetched already
  //The logic works as intended and the behavior can be monitored in the browser console
  fetchText = () => {
    let key = 'text_data_' + this.state.textCategory.toLowerCase(); //The id of the data in the saved resources
    if (this.saved_resources[key] === undefined) {
      //If data doesn´t exist in the saved resources, fetch
      console.log('Fetching text data...');
      fetch(url + this.state.textCategory.toLowerCase() + '.json')
        .then(res => res.json())
        .then(
          result => {
            console.log('Text Data retrieved from server');
            this.saved_resources[key] = result.data;
          },
          error => {
            console.log(error, 'Error while loading textdata from server'); //catch an error and throw a fail message
          }
        );
    } else {
      console.log('Text data already fetched');
    }
  };

  //Metod for fetching of pictures, similar behavior of fetchText()
  fetchPictures = () => {
    //The filename of the picture on server
    let filename =
      this.state.pictureCategory.toLowerCase() + '_' + this.state.selectedTab;
    let key = 'image_data_' + filename;
    if (this.saved_resources[key] === undefined) {
      console.log('Fetching Picture data...');
      //console.log(url + filename +".svg");
      fetch(url + filename + '.svg')
        .then(res => res.text())
        .then(
          result => {
            if (result === '404: Not Found\n') {
              console.log('Picture data not found on Server');
            } else {
              console.log('Picture Data retrieved from server with success!');
              this.saved_resources[key] = result;
            }
          },
          error => {
            console.log(error, 'Error while loading picture data from server');
          }
        );
    } else {
      console.log('Picture data already fetched');
    }
  };

  render() {
    this.createStartScreenData();
    console.log(this.undoArr.length, this.redoArr.length);
    console.log([
      this.state.soundCateory,
      this.state.textCategory,
      this.state.pictureCategory
    ]);

    return (
      <div className='app'>
        <main>
          <div className='grid-container'>
            <div className='tabs-bar'>
              <Tabdisplay
                onClick={this.handleTabClick}
                selectedTab={this.state.selectedTab}
              />
            </div>
            <div className='maindisp'>
              <Maindisplay
                selectedTab={this.state.selectedTab}
                soundCategory={this.state.soundCategory}
                handleFavorite={this.handleFavorite}
                getFavorites={this.getFavorites}
                deleteFavorite={this.deleteFavorite}
                isWelcomeScreenDisplayed={this.undoArr.length === 1}
              />
            </div>
            <div className='sidebar-category'>
              <Sidebar
                onChange={this.handleSession}
                handleUndo={this.handleUndo}
                handleRedo={this.handleRedo}
                isUndoEmpty={this.undoArr.length === 1}
                isRedoEmpty={this.redoArr.length === 0}
                updateTextCategory={this.updateTextCategory}
                updatePictureCategory={this.updatePictureCategory}
                updateSoundCategory={this.updateSoundCategory}
                getCheckboxCategories={[
                  this.state.soundCategory,
                  this.state.textCategory,
                  this.state.pictureCategory
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
