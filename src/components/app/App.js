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
      pictureFile: null,
      textFile: null,
      soundFile: null,
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

  // save the categories chosen in the sidebar
  handleSession = () => {
    // pop and push. Stack consisting of two arrays.

    let undoArr = [];

    let categories = {
      //selectedTab: this.state.selectedTab,
      soundCategory: this.state.soundCategory,
      soundFile: this.state.soundFile,
      textCategory: this.state.textCategory,
      textFile: this.state.textFile,
      pictureCategory: this.state.pictureCategory,
      pictureFile: this.state.pictureFile
    };

    // categories should be saved in sessioStorage first when they are displayed
    if (categories.soundCategory !== null) {
      if (sessionStorage.getItem('categoriesUndo')) {
        undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
        undoArr.push(categories);
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      } else {
        undoArr.push(categories);
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      }

      console.log('undoStack', undoArr);
    }
  };

  handleUndo = () => {
    // There must be an undo array after handleSession()
    let undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));

    if (!sessionStorage.getItem('categoriesRedo')) {
      if (undoArr.length > 0) {
        let redoArr = [undoArr.pop()];
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
        console.log('redoStack', redoArr);
      }
    } else {
      if (undoArr.length > 0) {
        let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));
        redoArr.push(undoArr.pop());
        sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
        sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
        console.log('redoStack', redoArr);
      }
    }
  };

  // NOT FINISHED YET!!!!
  handleRedo = () => {
    let redoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    console.log(redoArr);

    if (redoArr && redoArr.length > 0) {
      let undoArr = JSON.parse(sessionStorage.getItem('categoriesRedo'));
      undoArr.push(redoArr.pop());

      console.log(undoArr);
    }
  };

  handleFavorite = () => {
    if (localStorage.getItem('combinations')) {
      localStorage.removeItem('combinations');
      this.setState({ combinations: [] });
    }

    const combinations = {
      selectedTab: this.state.selectedTab,
      pictureCategory: this.state.pictureCategory,
      pictureFile: this.state.pictureFile,
      soundCategory: this.state.soundCategory,
      soundTrack: this.state.soundTrack,
      textCategory: this.state.textCategory,
      textFile: this.state.text
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
