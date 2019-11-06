import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js'
import ImageUrl from './components/ImageUrl/ImageUrl.js'
import Rank from './components/Rank/Rank.js'
import "tachyons"

const particlesOptions = {
  particles: {
    number:{
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    }
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
    }
  }

  onInputChange = (event) =>{
    console.log(event);
  }

  onDetect = () => {
    console.log("click");
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation/>
        <Rank/>
        <ImageUrl onInputChange={this.onInputChange} onDetect={this.onDetect}/>
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
