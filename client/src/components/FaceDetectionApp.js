import React, { Component } from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import StartPage from './StartPage';
import ImageUploader from './ImageUploader';

import './app.css';


class FaceDetectionApp extends Component {

  render() {
    const { image } = this.props
    return (
      <div className="app">
        {image ?
          <Canvas/>
        :
          <StartPage>
            <ImageUploader />
          </StartPage>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: state.faces.data.image
})

export default connect(mapStateToProps)(FaceDetectionApp);
