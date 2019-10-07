import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'

import FaceDetectionApp from './components/FaceDetectionApp'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <FaceDetectionApp />
      </Provider>
    );
  }
}

export default App;