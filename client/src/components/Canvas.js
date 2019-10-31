import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetStore } from '../actions/faces'
import PropTypes from 'prop-types';

import Menu from './Menu';
import Overlay from './Overlay';
import Tooltip from './Tooltip';

class Canvas extends Component {
  constructor(props){
    super(props)
    const { cords, image } = this.props
    this.state = {
      facesCords: cords,
      image,
      objects: [],
      display: false,
      canvasPosition: { x: null, y: null, w: null, h: null },
      isTooltip: true
    }
  }

  static propTypes = {
    cords: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    resetStore: PropTypes.func.isRequired,
  }


  componentDidMount = () => {
    this.updateCanvas()

    window.onresize = () => {
      const { display } = this.state
      if(display){
        this.setState({
          display: false
        })
      }
      this.updateCanvas()
    }
  }
  
  componentWillUnmount = () => {
      window.onresize = () => {
        try{
          this.updateCanvas()
        }catch(err){}
      }
  }

  updateCanvas = () => {
    const { facesCords } = this.state
    const { canvas, cvs } = this.refs
    const ctx = canvas.getContext('2d');
    
    const maxWidth = cvs.clientWidth;
    const maxHeight = cvs.clientHeight;

    const img = new Image();
    
    img.onload = () => {
      let start = 0;
      let end = 0;

      
      canvas.width  = maxWidth;
      canvas.height = maxHeight;

      // var x = canvas.width/2 - img.width/2;
      // var y = canvas.height/2 - img.height/2;

      // resizing the image to fit the canvas size
      const whr = img.width / img.height;
      let newWidth = canvas.width;
      let newHeight = newWidth / whr;
      if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = newHeight * whr;
          start = (canvas.width - newWidth) / 2;
      }
      end = (canvas.height - newHeight) / 2;

      // scaling faces cords to match resized image
      const objects = facesCords.map(c => {
        const x = Math.round(((c.x / img.width) * newWidth) + start);
        const y = Math.round(((c.y / img.height) * newHeight) + end);
        const w = Math.round((((c.w / img.width) * newWidth) - x) + start);
        const h = Math.round((((c.h / img.height) * newHeight) - y) + end);
        return {cords:{x: x, y: y, w: w, h: h}, isSelected: false}
      })
      
      ctx.drawImage(img, start, end, newWidth, newHeight);

      this.setState({
        objects,
        image: img,
        canvasPosition: {x: start, y: end, w: newWidth, h: newHeight}
      })
    };
    img.src = this.props.image;
  } 

  handleBlur = () => {
    const { canvas, fcanvas } = this.refs
    const ctx = canvas.getContext('2d');
    const fContext = fcanvas.getContext('2d');

    for(let object of this.state.objects){
      if(object.isSelected){

        // copy image 
        const imageData = ctx.getImageData(object.cords.x, object.cords.y, object.cords.w, object.cords.h)
        fcanvas.width  = imageData.width;
        fcanvas.height = imageData.height;

        // past image to fcanvas
        fContext.putImageData(imageData, 0, 0);

        let strength;

        if(imageData.height >= 300){
          strength = 6;
        }else if(imageData.height >= 240){
          strength = 5;
        }else if(imageData.height >= 180){
          strength = 4;
        }else if(imageData.height >= 120){
          strength = 3;
        }else{
          strength = 2;
        }

        // blur pasted image
        fContext.globalAlpha = 0.5;

        for (let y = -strength; y <= strength; y += 2) {
          for (let x = -strength; x <= strength; x += 2) {
            fContext.drawImage(fcanvas, -x, -y);
          }
        }

        fContext.globalAlpha = 1.0;

        //copy blured image and past back to the canvas
        const newImageData = fContext.getImageData(0, 0, imageData.width, imageData.height)
        ctx.putImageData(newImageData, object.cords.x, object.cords.y);
      }
    }
  }

  upadateState = (cords) => {
    const objects = this.state.objects.map(object => object.cords.x === cords.x ? {...object, isSelected: !object.isSelected} : object)
    this.setState({
      objects
    })
  }

  handleClear = () => {
    const { image, canvasPosition } = this.state;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(image, canvasPosition.x, canvasPosition.y, canvasPosition.w, canvasPosition.h);
  }

  handleDisplay = () => {
    this.setState({
      display: !this.state.display
    })
  }

  handleTooltip = () => {
    this.setState({
      isTooltip: !this.state.isTooltip
    })
  }

  render() {
    const { resetStore } = this.props;
    const { display, facesCords, objects, isTooltip } = this.state;

    const fcvs = {
      width:'40px',
      height:'40px',
      display: 'none'
    }

    return (
        <div className="canvas-menu">
          <div className="canvas-wrapper" ref="cvs">
              <canvas ref="canvas"></canvas>
              {(facesCords.length > 0 && display) && objects.map((object, index) => 
                <Overlay key={index} object={object} handleUpdateState={this.upadateState} />)}
          </div>
          <canvas ref="fcanvas" style={fcvs}></canvas>
          {facesCords.length > 0 ?
            <Menu display={display} handleDisplay={this.handleDisplay} handleClear={this.handleClear} handleBlur={this.handleBlur} faces={facesCords.length}>
              {isTooltip && <Tooltip display={display} handleTooltip={this.handleTooltip}/>}
            </Menu>
            :
            <div className="not-found">
              <p>No faces found!</p>
              <button onClick={() => resetStore()}>Upload new image</button>
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  cords: state.faces.data.cords,
  image: state.faces.data.image,
})

export default connect(mapStateToProps, { resetStore })(Canvas);