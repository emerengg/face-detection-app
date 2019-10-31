import React, { Component } from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import Main from './Main';
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
          <Main>
            <ImageUploader />
          </Main>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: state.faces.data.image
})

export default connect(mapStateToProps)(FaceDetectionApp);
