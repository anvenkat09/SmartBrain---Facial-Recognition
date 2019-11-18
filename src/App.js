import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import ImageUrl from './components/ImageUrl/ImageUrl.js'
import Rank from './components/Rank/Rank.js'
import "tachyons"

const particlesOptions = {
  particles: {
    number:{
      value: 80,
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
      input: '',
      imageUrl: '',
      b_boxes: [],
      // route should always start at the signin page
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) =>{
    this.setState(
      {input: event.target.value}
    );
  }

  onDetect = () => {
    this.setState(
      {imageUrl: this.state.input}
    );
    fetch('https://pacific-reef-20355.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(
      response => {
        if(response){
          fetch('https://pacific-reef-20355.herokuapp.com/image', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        
        this.displayBoundingBoxes(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState(
      {
        imageUrl: '',
        route: route
      }
    );
  }

  calculateFaceLocation = (data) => {
    // grab bounding boxes of all faces
    const faces = data.outputs[0].data.regions;
    const image = document.getElementById('detected_image');
    const width = Number(image.width);
    const height = Number(image.height);

    let faces_with_correct_coords = faces.map((face) => {
      let current_face = {};
      current_face.left_col = face.region_info.bounding_box.left_col * width;
      current_face.right_col = width - (face.region_info.bounding_box.right_col * width);
      current_face.top_row = face.region_info.bounding_box.top_row * height;
      current_face.bottom_row = height - (face.region_info.bounding_box.bottom_row * height);
      return current_face; 
    });

    return faces_with_correct_coords;
  }

  displayBoundingBoxes = (boxes) => {
    this.setState(
      {b_boxes: boxes}
    );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation currentRoute={this.state.route} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home' 
          ? (
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageUrl onInputChange={this.onInputChange} onDetect={this.onDetect}/>
            <FaceRecognition boxes = {this.state.b_boxes} imageUrl = {this.state.imageUrl}/>
          </div>)
          : (
            this.state.route === 'signin'
            ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
