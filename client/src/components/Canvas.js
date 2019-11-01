import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetStore } from '../actions/faces'

import Menu from './Menu';
import Overlay from './Overlay';
import Tooltip from './Tooltip';


class Canvas extends Component {
  constructor(props){
    super(props)
    const { image } = this.props
    this.state = {
      image,
      imagePosition: null,
      objects: [],
      isMenu: false,
      isTooltip: true
    }
  }

  static propTypes = {
    cords: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    resetStore: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.updateCanvas();
    window.onresize = () => {
      const { isMenu } = this.state;
      if(isMenu){
        this.setState({
          isMenu: false
        })
      }
      try {
        this.updateCanvas();
      } catch (err){}
    }
  }

  updateCanvas = () => {
    const { image, cords } = this.props;
    const { canvas, cvs } = this.refs;
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
      const objects = cords.map(c => {
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
        imagePosition: {x: start, y: end, w: newWidth, h: newHeight}
      })
    };
    img.src = image;
  } 

  handleBlur = () => {
    const { canvas, fcanvas } = this.refs;
    const ctx = canvas.getContext('2d');
    const fContext = fcanvas.getContext('2d');

    for(let object of this.state.objects){
      if(object.isSelected){

        // copy image 
        const imageData = ctx.getImageData(object.cords.x, object.cords.y, object.cords.w, object.cords.h);
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
        const newImageData = fContext.getImageData(0, 0, imageData.width, imageData.height);
        ctx.putImageData(newImageData, object.cords.x, object.cords.y);
      }
    }
  }

  updateObject = (cords) => {
    const objects = this.state.objects.map(object => object.cords.x === cords.x ? {...object, isSelected: !object.isSelected} : object)
    this.setState({
      objects
    })
  }

  handleClear = () => {
    const { image, imagePosition } = this.state;
    const {x, y, w, h} = imagePosition;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, x, y, w, h);
  }

  handleDisplay = () => {
    this.setState({
      isMenu: !this.state.isMenu
    })
  }

  handleTooltip = () => {
    this.setState({
      isTooltip: !this.state.isTooltip
    })
  }

  render() {
    const { cords, resetStore } = this.props;
    const { isMenu, objects, isTooltip } = this.state;

    return (
        <div className="canvas-menu">
          <div className="canvas-wrapper" ref="cvs">
              <canvas ref="canvas"></canvas>
              {(cords.length > 0 && isMenu) && objects.map((object, index) => (
                <Overlay key={index} object={object} handleUpdateState={this.updateObject} />
              ))}
          </div>
          <canvas className="fcanvas" ref="fcanvas"></canvas>
          {cords.length > 0 ?
            <Menu display={isMenu} handleDisplay={this.handleDisplay} handleClear={this.handleClear} handleBlur={this.handleBlur} faces={cords.length}>
              {isTooltip && <Tooltip display={isMenu} handleTooltip={this.handleTooltip}/>}
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