import React, { Component } from 'react';
import './Sidebar.css';
import {Soundform} from '../soundform/Soundform';
import ChoiceSelector from '../choiceSelector/ChoiceSelector';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //here are all the category retrieved from the child componets and stored in the state of the parent sidebar
        // and later on passed to the app in order to be retrieve the data 
      pictureCategory : null,
      textCategory : null,
      soundCategory : null, 
    };
    //this.updateTextData = this.updateTextData.bind(this);
  }
  updatePictureCategory = (picture) =>{
    this.setState({
      pictureCategory : picture,
    });
  }
  updateTextCategory = (text) => {
    this.setState({
      textCategory : text,
    });
  }

  render() {
    return (
      <div className='Sidebar'>
        <h3>Kategorier</h3>
        <Soundform/>
        <ChoiceSelector sendCategory = {this.updateTextCategory} categoryName="Text" alternative1="Christmas" alternative2="Valentine" alternative3="Get Well"/>
        <ChoiceSelector sendCategory = {this.updatePictureCategory} categoryName="Picture" alternative1="Dogs" alternative2="Cats" alternative3="Rats"/>
      </div>
    );
  }
}

export default Sidebar;
