import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import Favorite from '../favorite/Favorite';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    //Initializing undo and redo stacks with elements from session storage, empty if none.
    this.undoArr = sessionStorage.getItem('categoriesUndo')
      ? JSON.parse(sessionStorage.getItem('categoriesUndo'))
      : [];

    this.redoArr = sessionStorage.getItem('categoriesRedo')
      ? JSON.parse(sessionStorage.getItem('categoriesRedo'))
      : [];

    this.state = {
      soundCategory: null,
      textCategory: null,
      pictureCategory: null,
      //selected tab number, set to null if welcome screen is visualized
      selectedTab: this.undoArr.length <= 1 ? null : 1,
      favoriteCombination: JSON.parse(localStorage.getItem('favoriteCombination')),
      saved_resources: {},
      //True if a saved combination is found in local storage
      isFavoriteSaved: localStorage.getItem('favoriteCombination') !== null
    };
    //In order to limit unecessary renders of App, a tmp array is used to store fetched data from 
    //asynchronics fetch functions until both are finished and then update state with tmp data.
    this.tmp_fetched_data = {};
    //Previous fetched values used to evaluate the need for a new fetch for data.
    this.previous_fetched_text_category = null;
    this.previous_fetched_picture_category = null;
    this.previous_selected_tab = null;
  }
  //Run right after component is mounted
  //componentDidMount = () => {
    //
    //const favoriteCombination = JSON.parse(localStorage.getItem('favoriteCombination'));
   // this.setState({ favoriteCombination });
  //};

  //It creats a welcome screen combination data and pushes it in the undo stack
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
  
  componentDidUpdate() {
    //If the component has been updated and a tab is selected, so fetch the data
    if (this.state.selectedTab !== null) {
      //Compare the previous categories in the undo stack with categories in state (visualizing)
      //and if one of them is different, push the set of categories in the stack (= new combination to visualize)
      let previousCategories = this.undoArr[this.undoArr.length - 1];
      if (
        previousCategories.soundCategory !== this.state.soundCategory ||
        previousCategories.textCategory !== this.state.textCategory ||
        previousCategories.pictureCategory !== this.state.pictureCategory
      ) {
        // change the sesstionStorage and update the state
        this.handleSession();
      }

      console.log('tab selected: ' + this.state.selectedTab);
      console.log('previous tab selected: ' + this.previous_selected_tab);
      console.log(this.previous_selected_tab !== this.state.selectedTab);
      console.log('previous text cat: ' + this.previous_fetched_text_category);
      console.log('text cat: ' + this.state.textCategory);
      console.log(
        this.previous_fetched_text_category !== this.state.textCategory
      );
      console.log(
        'previous pic cat: ' + this.previous_fetched_picture_category
      );
      console.log('pic cat: ' + this.state.pictureCategory);
      console.log(
        this.previous_fetched_picture_category !== this.state.pictureCategory
      );
      //Evaluate the need of fetching data
      if (
        this.previous_fetched_text_category !== this.state.textCategory ||
        this.previous_fetched_picture_category !== this.state.pictureCategory ||
        this.previous_selected_tab !== this.state.selectedTab
      ) {
        this.fetchText();
        this.fetchPictures();
      }
    }
    this.previous_selected_tab = this.state.selectedTab;
  }
  //Called after the complete run of both fetchText and fetchPicture. It then update the state with the new fetched data.
  updateFetchedData() {
    if (Object.keys(this.tmp_fetched_data).length === 2) {
      let saved_resources_copy = Object.assign({}, this.state.saved_resources);
      if (this.tmp_fetched_data['text'] !== null) {
        saved_resources_copy[
          this.tmp_fetched_data['text'][0]
        ] = this.tmp_fetched_data['text'][1];
      }
      if (this.tmp_fetched_data['picture'] !== null) {
        saved_resources_copy[
          this.tmp_fetched_data['picture'][0]
        ] = this.tmp_fetched_data['picture'][1];
      }
      console.log('updating fetched data');
      delete this.tmp_fetched_data['text'];
      delete this.tmp_fetched_data['picture'];
      console.log(this.tmp_fetched_data);
      this.previous_fetched_text_category = this.state.textCategory;
      this.previous_fetched_picture_category = this.state.pictureCategory;
      this.setState({
        saved_resources: saved_resources_copy
      });
    }
  }
  //called at each tabclick
  handleTabClick = e => {
    // Updates selected tab in state if changed from previous state.
    if (e.target.value !== this.state.selectedTab) {
      this.setState({ selectedTab: e.target.value });
    }
  };

  //Props passed down to sidebar that will update app state with the selected categories
  updateTextCategory = text => {
    if (text !== this.state.textCategory) {
      this.setState({
        textCategory: text
      });
    }
  };

  updatePictureCategory = picture => {
    if (picture !== this.state.pictureCategory) {
      this.setState({
        pictureCategory: picture
      });
    }
  };

  updateSoundCategory = sound => {
    if (sound !== this.state.soundCategory)
      this.setState({
        soundCategory: sound,
        soundTrack: 1
      });
  };

  // save the categories chosen in the sidebar in the undo stack on change
  handleSession = () => {
    let categories = {
      soundCategory: this.state.soundCategory,
      textCategory: this.state.textCategory,
      pictureCategory: this.state.pictureCategory,
      selectedTab: this.state.selectedTab
    };
    this.undoArr.push(categories);
    sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
    this.redoArr = [];
    sessionStorage.setItem('categoriesRedo', JSON.stringify([]));
  };

  handleUndo = () => {
    if (this.undoArr.length > 1) {
      // pushes the last element of undoArr in redoArr
      this.redoArr.push(this.undoArr.pop());
      let previousCategories = this.undoArr[this.undoArr.length - 1];
      
      // change the state of the categories. Is used for displaying checkbox value.
      this.setState({
        soundCategory: previousCategories.soundCategory,
        textCategory: previousCategories.textCategory,
        pictureCategory: previousCategories.pictureCategory,
        selectedTab: this.undoArr.length === 1 ? null : this.state.selectedTab
      });

      sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(this.redoArr));
    }
  };
  //Called onClick of redo button. Pop the last element from redo stack and pushes to undo stack.
  handleRedo = () => {
    if (this.redoArr.length > 0) {
      this.undoArr.push(this.redoArr.pop());

      let currentCategories = this.undoArr[this.undoArr.length - 1];

      // change the state pf the categories. Is used for displaying checkbox value.
      this.setState({
        soundCategory: currentCategories.soundCategory,
        textCategory: currentCategories.textCategory,
        pictureCategory: currentCategories.pictureCategory,
        selectedTab: this.undoArr.length !== 1 ? 1 : this.state.selectedTab
      });

      sessionStorage.setItem('categoriesUndo', JSON.stringify(this.undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(this.redoArr));
    }
  };
  
//Save a new favourite combination if different from previous saved favourite combination
  handleFavorite = () => {
    let previousCombination = JSON.parse(localStorage.getItem('favoriteCombination'));
    const combination = {
      selectedTab: this.state.selectedTab,
      soundCategory: this.state.soundCategory,
      textCategory: this.state.textCategory,
      pictureCategory: this.state.pictureCategory
    };
    if (JSON.stringify(previousCombination) !== JSON.stringify(combination)) {
      localStorage.setItem('favoriteCombination', JSON.stringify(combination));
      this.setState({
        isFavoriteSaved: true
      });
    }
  };
//Set the app state to visualize the favourite combination if different from current visualizing combination
  getFavorite = () => {
    let newCombination = JSON.parse(localStorage.getItem('favoriteCombination'));

    const combination = {
      selectedTab: this.state.selectedTab,
      soundCategory: this.state.soundCategory,
      textCategory: this.state.textCategory,
      pictureCategory: this.state.pictureCategory
    };

    if (JSON.stringify(combination) !== JSON.stringify(newCombination)) {
      this.setState({
        selectedTab: newCombination.selectedTab,
        pictureCategory: newCombination.pictureCategory,
        soundCategory: newCombination.soundCategory,
        textCategory: newCombination.textCategory
      });
    }
  };

  //Fetching of text if has not been fetched already
  //The logic works as intended and the behavior can be monitored in the network tool of the browser
  fetchText() {
    let filename =
      this.state.textCategory.toLowerCase() + '_' + this.state.selectedTab;
    //The id of the data in the saved resources
    let key = 'text_data_' + filename; 
    if (this.state.saved_resources[key] === undefined) {
      //If data doesn´t exist in the saved resources, fetch
      console.log('Fetching text data...');
      fetch("../prosjekt2/assets/text/"  + filename + '.json')
        .then(res => res.json())
        .then(
          result => {
            console.log('Text Data retrieved from server');
            let tmp_data = [key, [result.title, result.text]];
            this.tmp_fetched_data['text'] = tmp_data;
            this.updateFetchedData();
          },
          error => {
            console.log(error, 'Error while loading textdata from server'); //catch an error and throw a fail message
          }
        );
    } else {
      console.log('Text data already fetched');
      let tmp_data = null;
      this.tmp_fetched_data['text'] = tmp_data;
      this.updateFetchedData();
    }
  }
  //Metod for fetching of pictures, similar behavior of fetchText()
  fetchPictures = () => {
    //The filename of the picture on server
    let filename = this.state.pictureCategory.toLowerCase() + '_' + this.state.selectedTab;
    let key = 'image_data_' + filename;
    if (this.state.saved_resources[key] === undefined) {
      console.log('Fetching Picture data...');
      fetch("../prosjekt2/assets/images/" + filename + '.svg')
        .then(res => res.text())
        .then(
          result => {
            if (result === '404: Not Found\n') {
              console.log('Picture data not found on Server');
            } else {
              console.log('Picture Data retrieved from server with success!');
              let tmp_data = [key, result];
              this.tmp_fetched_data['picture'] = tmp_data;
              this.updateFetchedData();
            }
          },
          error => {
            console.log(error, 'Error while loading picture data from server');
          }
        );
    } else {
      console.log('Picture data already fetched');
      let tmp_data = null;
      this.tmp_fetched_data['picture'] = tmp_data;
      this.updateFetchedData();
    }
  };
  //Props down data to be visualized in mainDisplay
  sendDataToVisualize() {
    if (
      this.state.selectedTab === null ||
      Object.keys(this.state.saved_resources).length === 0
    )
      return null;
    let picture_data = this.state.saved_resources[
      'image_data_' +
        this.state.pictureCategory.toLowerCase() +
        '_' +
        this.state.selectedTab
    ];
    let text_data = this.state.saved_resources[
      'text_data_' +
        this.state.textCategory.toLowerCase() +
        '_' +
        this.state.selectedTab
    ];

    if (picture_data !== undefined && text_data !== undefined) {
      return [picture_data, text_data];
    } else return null;
  }

  render() {
    this.createStartScreenData();
    console.log('rendering...');
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
                data={this.sendDataToVisualize()}
                isWelcomeScreen={this.state.selectedTab === null}
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
            <div className='favorite'>
              <Favorite
                handleFavorite={this.handleFavorite}
                getFavorite={this.getFavorite}
                isFavoriteSaved={this.state.isFavoriteSaved}
                showHandleFavorite={this.state.selectedTab === null}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default App;