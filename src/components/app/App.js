import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textCategory: null,
      pictureCategory: null,
      soundCategory: null,
      pictureFilePath: null,
      textFilePath: null,
      soundFilePath: null,
      selectedTab: null,
      combinations: null
    };
  }

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
