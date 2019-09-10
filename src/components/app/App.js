import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  state = {};

  handleTabClick = e => {
    return '' && e.target.value;
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
            <div className='InnerBox'>
              <BrowserRouter>
                <Tabdisplay onClick={this.handleTabClick} />
                <Switch>
                  <Route exact path='/' component={Maindisplay} />
                  <Route
                    exact
                    path='/1'
                    render={props => <Maindisplay {...props} number='1' />}
                  />
                  <Route
                    exact
                    path='/2'
                    render={props => <Maindisplay {...props} number='2' />}
                  />
                  <Route
                    exact
                    path='/3'
                    render={props => <Maindisplay {...props} number='3' />}
                  />
                  <Route
                    exact
                    path='/4'
                    render={props => <Maindisplay {...props} number='4' />}
                  />
                </Switch>
              </BrowserRouter>
              <Sidebar />
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
