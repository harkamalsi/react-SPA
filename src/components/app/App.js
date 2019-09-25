import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

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
  }

  createStartScreenData() {
    if (this.undoArr.length === 0 && this.state.textCategory !== null) {
      let welcomeScreenCategories = {
        soundCategory: this.state.soundCategory,
        textCategory: this.state.textCategory,
        pictureCategory: this.state.pictureCategory
      };

      this.undoArr.push(welcomeScreenCategories);
    }
  }

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
  };

  componentDidMount = () => {
    const combinations = JSON.parse(localStorage.getItem('combinations'));
    this.setState({ combinations });
  };

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

  render() {
    this.createStartScreenData();
    console.log(this.undoArr.length, this.redoArr.length);
    console.log([
      this.state.soundCategory,
      this.state.textCategory,
      this.state.pictureCategory
    ]);

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
                handleFavorite={this.handleFavorite}
                getFavorites={this.getFavorites}
                deleteFavorite={this.deleteFavorite}
                isWelcomeScreenDisplayed={this.undoArr.length === 1}
              />
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
        <footer>
          <h2>This is footer</h2>
        </footer>
      </div>
    );
  }
}

export default App;
