import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Soundform from '../soundform/Soundform';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      textCategory : null,
      pictureCategory : null,
      soundCategory : null,
    }
  }
  
  handleTabClick = e => {
    // e.target.value will help us decide which comibation to show on the mainDisplay component.
    this.setState({ comibation: e.target.value });
  };
  updateTextCategory=(text)=>{
    this.setState({
      textCategory : text,
    })
  };
  updatePictureCategory=(picture)=>{
    this.setState({
      pictureCategory : picture,
    })
  };
  updateSoundCategory=(sound)=>{
    this.setState({
      soundCategory : sound,
    })
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
              <Maindisplay combi={this.state.comibation} />
              <Sidebar sendTextCategory ={this.updateTextCategory} sendPictureCategory ={this.updatePictureCategory} sendSoundCategory ={this.updateSoundCategory}/>
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
