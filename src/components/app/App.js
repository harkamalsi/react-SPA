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

  componentDidUpdate = () => {
    /* console.log(
      'APP state updated:',
      this.state.soundCategory,
      this.state.textCategory,
      this.state.pictureCategory
    ); */
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

    let undoArr = sessionStorage.getItem('categoriesUndo')
      ? JSON.parse(sessionStorage.getItem('categoriesUndo'))
      : [];

    // moves that we will maybe get undoed or redoed
    let categories = {
      //selectedTab: this.state.selectedTab,
      soundCategory: this.state.soundCategory,
      soundFilePath: this.state.soundFilePath,
      textCategory: this.state.textCategory,
      textFilePath: this.state.textFilePath,
      pictureCategory: this.state.pictureCategory,
      pictureFilePath: this.state.pictureFilePath
    };

    // categories should be saved in sessioStorage first when they are displayed. soundCategory could also be textCategory or pictureCategory.
    if (this.state.selectedTab !== null) {
      // push the element to the end of undoArr
      undoArr.push(categories);
      sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      // empty the redoArr
      sessionStorage.setItem('categoriesRedo', JSON.stringify([]));
      /* console.log(
        categories.soundCategory,
        categories.textCategory,
        categories.pictureCategory,
        '- pushed into undoArr'
      ); */
    }

    console.log('undoArrStack: ', undoArr);
    console.log(
      'RedoArrStack: ',
      JSON.parse(sessionStorage.getItem('categoriesRedo'))
    );
  };

  handleUndo = () => {
    // There must be an undo array after handleSession()
    let undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr = sessionStorage.getItem('categoriesRedo')
      ? JSON.parse(sessionStorage.getItem('categoriesRedo'))
      : [];

    if (undoArr && undoArr.length > 0) {
      // pushes the last element of undoArr in redoArr
      redoArr.push(undoArr.pop());

      // change the state pf the categories. Is used for displaying checkbox value.
      let previousCategories = undoArr[undoArr.length - 1];

      this.setState({
        soundCategory: previousCategories.soundCategory,
        textCategory: previousCategories.textCategory,
        pictureCategory: previousCategories.pictureCategory
      });

      sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
      /* console.log(
        categoriesItem.soundCategory,
        categoriesItem.textCategory,
        categoriesItem.pictureCategory,
        '- pushed into redoArr'
      ); */
    }

    /* let undoArr2 = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr2 = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    console.log({ undoArr2 });
    console.log({ redoArr2 }); */
  };

  handleRedo = () => {
    let redoArr = sessionStorage.getItem('categoriesRedo')
      ? JSON.parse(sessionStorage.getItem('categoriesRedo'))
      : [];

    if (redoArr && redoArr.length > 0) {
      let undoArr = JSON.parse(sessionStorage.getItem('categoriesUndo'));
      let categoriesItem = redoArr.pop();
      undoArr.push(categoriesItem);

      /* // change the state pf the categories. Is used for displaying checkbox value.
      this.setState({
        soundCategory: categoriesItem.soundCategory,
        textCategory: categoriesItem.textCategory,
        pictureCategory: categoriesItem.pictureCategory
      }); */

      sessionStorage.setItem('categoriesUndo', JSON.stringify(undoArr));
      sessionStorage.setItem('categoriesRedo', JSON.stringify(redoArr));
      /* console.log(
        categoriesItem.soundCategory,
        categoriesItem.textCategory,
        categoriesItem.pictureCategory,
        '- pushed into undoArr'
      ); */
    }

    /* let undoArr3 = JSON.parse(sessionStorage.getItem('categoriesUndo'));
    let redoArr3 = JSON.parse(sessionStorage.getItem('categoriesRedo'));

    console.log({ undoArr3 });
    console.log({ redoArr3 }); */
  };

  // Returns true if undoArr is empty and false else
  isUndoEmpty = () => {
    let length = sessionStorage.getItem('categoriesUndo')
      ? JSON.parse(sessionStorage.getItem('categoriesUndo')).length
      : 0;

    let isUndoEmpty = length === 0 ? true : false;

    // console.log('undoLengthEmpty: ', isUndoEmpty);

    return isUndoEmpty;
  };

  // Returns true if redoArr is empty and false else
  isRedoEmpty = () => {
    let length = sessionStorage.getItem('categoriesRedo')
      ? JSON.parse(sessionStorage.getItem('categoriesRedo')).length
      : 0;

    let isRedoEmpty = length === 0 ? true : false;

    // console.log('redoLengthEmpty: ', isRedoEmpty);

    return isRedoEmpty;
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
              />
              <Sidebar
                onChange={this.handleSession}
                handleUndo={this.handleUndo}
                handleRedo={this.handleRedo}
                isUndoEmpty={this.isUndoEmpty}
                isRedoEmpty={this.isRedoEmpty}
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
