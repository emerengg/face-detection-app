import React, { Component } from 'react';
import { connect } from 'react-redux';

import Canvas from './Canvas';
import StartPage from './StartPage';
import Upload from './hooks/components/Upload';

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
            <Upload />
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
