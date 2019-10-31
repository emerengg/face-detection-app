import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetStore } from '../actions/faces'


const Menu = ({display, faces, handleDisplay, handleBlur, handleClear, resetStore, children}) => {

  const displayFaces = () => {
    handleDisplay()
  }

  const blurImage = () => {
    handleBlur()
  }

  const clearImage = () => {
    handleClear()
  }

  const handleRestart = () => {
    resetStore()
  }

  const buttonStyle = display ? {opacity: 1, cursor: 'pointer'} : {opacity: 0.5, cursor: 'default'};

  return (
    <Fragment>
      <div className="menu" data-testid="menu">
        <div>
          <button className="btn" data-testid="sa" onClick={blurImage} style={buttonStyle}>
            <i className="material-icons left">blur_on</i>Blur 
          </button>

          <button className="btn" onClick={clearImage}>
            <i className="material-icons left">undo</i>
            <span>Undo</span>
          </button>
        </div>
        
        <div>
          <p className="display-faces">Display {faces === 1 ? <span>face</span> : <span>faces</span>}</p>
          <label htmlFor="displayFaces" className="switch">
            <input type="checkbox" id="displayFaces" data-testid="displayFaces" checked={display} onChange={displayFaces} />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <button className="btn" onClick={handleRestart}>
            <i className="material-icons left">file_upload</i>Upload 
          </button>
        </div>
      </div>
      {children}
    </Fragment>
  );
}

Menu.propTypes = {
  display: PropTypes.bool.isRequired,
  faces: PropTypes.number.isRequired,
  handleDisplay: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  resetStore:PropTypes.func.isRequired
}

export default connect(null, { resetStore })(Menu);