import React from 'react';
import Maindisplay from '../maindisplay/Maindisplay';
import Sidebar from '../sidebar/Sidebar';
import Tabdisplay from '../tabdisplay/Tabdisplay';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header>
        <div>
          <h1>This is header</h1>
        </div>
      </header>
      <main>
        <div className='Box'>
          <Tabdisplay />
          <div className='InnerBox'>
            <Maindisplay />
            <Sidebar name='Harkamal' />
          </div>
        </div>
      </main>
      <footer>
        <h2>This is footer</h2>
      </footer>
    </div>
  );
}

export default App;
