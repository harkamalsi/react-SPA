import React, { Component } from 'react';
import './Sidebar.css';
import {Soundform} from '../soundform/Soundform';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  render() {
    return (
      <div className='Sidebar'>
        <h3>This is Sidebar {this.props.name}!</h3>
        <Soundform/>
      </div>
    );
  }
}

export default Sidebar;
