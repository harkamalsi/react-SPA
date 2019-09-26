import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';


import App from './App';
import AudioPlayer from '../soundform/AudioPlayer';

import { conditionalExpression } from '@babel/types';
import Tabdisplay from '../tabdisplay/Tabdisplay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


/*

test('my first test', () => {
    const component = renderer.create(
        <AudioPlayer 
            soundCategory="Nature"
            soundTrack="1" 
        />);
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //component.root.findByType('button').props.onClick();
    console.log(component.root);
    
    console.log(tree.children[0].props.src);
    console.log(tree.children[0].props);
    expect(tree).toMatchSnapshot();
}); */


describe('Testing app', () => {

  it('renders correctly', () => {
    const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Tab click updates app state "selectedTab', () => {
    //const component = renderer.create(<App />);
    //let tree = component.toJSON();
    //expect(tree).toMatchSnapshot();

    Enzyme.configure({ adapter: new Adapter() });
    const componentEnzyme = mount(<App />);

    expect(componentEnzyme.state('selectedTab')).toEqual(null);


    let tabButton = componentEnzyme.find('#combination1');
    tabButton.simulate('click');
    expect(componentEnzyme.state('selectedTab')).toEqual("1");

    tabButton = componentEnzyme.find('#combination2');
    tabButton.simulate('click');
    expect(componentEnzyme.state('selectedTab')).toEqual("2");

    tabButton = componentEnzyme.find('#combination3');
    tabButton.simulate('click');
    expect(componentEnzyme.state('selectedTab')).toEqual("3");

    tabButton = componentEnzyme.find('#combination4');
    tabButton.simulate('click');
    expect(componentEnzyme.state('selectedTab')).toEqual("4");

  });

  it('Tab click to update audioplayer', () => {
   //// const component = renderer.create(<App />);
    //let tree = component.toJSON();
    //expect(tree).toMatchSnapshot();


    Enzyme.configure({ adapter: new Adapter() });

    const componentEnzyme = mount(<App />);
    let audioPlayer = componentEnzyme.find('.soundPlayer');
    expect(audioPlayer.props().src).toEqual(undefined);

    //tab button 1
    let tabButton = componentEnzyme.find('#combination1');
    tabButton.simulate('click');
    audioPlayer = componentEnzyme.find('.soundPlayer');
    expect(audioPlayer.props().src).toEqual("1.mp3");

    //tab button 2
    tabButton = componentEnzyme.find('#combination2');
    tabButton.simulate('click');
    audioPlayer = componentEnzyme.find('.soundPlayer');
    expect(audioPlayer.props().src).toEqual("2.mp3");

    //tab button 3
    tabButton = componentEnzyme.find('#combination3');
    tabButton.simulate('click');
    audioPlayer = componentEnzyme.find('.soundPlayer');
    expect(audioPlayer.props().src).toEqual("3.mp3");

    //tab button 2
    tabButton = componentEnzyme.find('#combination4');
    tabButton.simulate('click');
    audioPlayer = componentEnzyme.find('.soundPlayer');
    expect(audioPlayer.props().src).toEqual("4.mp3");

  });


  it('Categorychange updates appstate "soundCategory', () => {
    //const component = renderer.create(<App />);
    //let tree = component.toJSON();
    //expect(tree).toMatchSnapshot();


    Enzyme.configure({ adapter: new Adapter() });

    const componentEnzyme = mount(<App />);

    expect(componentEnzyme.state('soundCategory')).toEqual("Nature");


    // index: 0 = nature, 1 = Piano, 2 = City Life, 
    // 3 = Emosjoner, 4 = Farger, 5 = Dyr
    // 6 = Animals, 7 = Cats, 8 = Rats

    let formButton = componentEnzyme.find('input').at(1);
    formButton.instance().checked = true; 
    formButton.simulate('change');
    
    formButton = componentEnzyme.find('input').at(0);
    expect(formButton.props().checked).toEqual(false);
    formButton = componentEnzyme.find('input').at(1);
    expect(formButton.props().checked).toEqual(true);
    
  }

  );
  //let audioPlayer = component.root.findByProps({ className: "soundPlayer" });


  //console.log(componentEnzyme.state('selectedTab'));


  //console.log(audioPlayer.props.src);

  //tabButton.simulate('click', {e: {target: {value: 1}}});

  /*
  
  
  
  console.log(componentEnzyme.state('soundCategory'));
  componentEnzyme.find('soundPlayer').update();

  let audioP = component.root.findByProps({ className: "soundPlayer" });

  console.log(audioP.props);
  console.log(componentEnzyme.prop('src'))


  */


  //console.log(component.root.children[0].children[0].children[0]);
  // console.log("0============================================================");
  //console.log(component.root.findAllByType('button')[0].props.onClick());
  // console.log(component.root.findByProps({ id: "combination1" }).props.onClick());

  /*
console.log("1============================================================");
console.log(tree);
console.log("2============================================================");
console.log(tree.children)
console.log("3============================================================");
console.log(tree.children[0])
console.log("4============================================================");
console.log(tree.children[0].children)
console.log("5============================================================");
console.log(tree.children[0].children[0].children)
console.log("6============================================================");
console.log(tree.children[0].children[0].children[0].props)
console.log("7============================================================");
console.log(tree.children[0].children[0].children[1].props)
console.log("8============================================================");
console.log(tree.children[0].children[0].children[2].props)
  */

  //console.log(tree.children[0].props.src);
  //console.log(tree.children[0].props);

});