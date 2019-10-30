import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getFaces, clearUploadError } from '../actions/faces'


class ImageUploader extends Component {
    
    state = {
        image: null,
        name: null,
        isLoading: false,
        error: null,
        allowedExtensions: ['jpg', 'jpeg', 'png']
    }

    static propTypes = {
        getFaces: PropTypes.func.isRequired
    }

    componentDidUpdate(prevPorp, prevState){
        const { uploadError } = this.props
        if((uploadError !== prevPorp.uploadError) && uploadError){
            this.setState({
                image: null,
                name: null,
                isLoading: false,
                error: uploadError
            }, () => {
                const { uploadError } = this.props;
                if(uploadError !== null) this.props.clearUploadError();
            })
        }
    }

    handleSelectedFile = (e) => {
        try {
            const { allowedExtensions } = this.state;

            const image = e.target.files[0];
            const fileName = image.name;

            const name = fileName.length <= 20 ? fileName : `${fileName.substring(0, 19)}...`;
            const fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();

            if (allowedExtensions.includes(fileExtension)){ 
                this.setState({
                    image,
                    name,
                    error: null
                })
            } else {
                this.setState({   
                    name,
                    error: "Only jpg/jpeg and png files are allowed!"
                })
            }
        } catch(err) {}
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { image, isLoading } = this.state
        this.props.getFaces(image);
        this.setState({
            isLoading: !isLoading
        })
    }

    render() {
        const { name, error, isLoading } = this.state;

        const submitBtnStyle = name || error ? { visibility: "visible" } : { visibility: "hidden" };
        const imageNameStyle = name && error ? { color: "red" } : { color: "green" };

        return (
            <Fragment>
                {isLoading ?  
                    <div className="loading" data-testid="loading">
                        <div className="loader"></div>
                    </div>
                    :
                    <div className="upload-form">
                        <form onSubmit={this.handleSubmit} data-testid="image-upload-form">
                            <input type="file" className="inputfile" id="imageUpload" onChange={this.handleSelectedFile} data-testid="imageUpload"/>
                            <label className="upload" htmlFor="imageUpload">
                                <i className="ico fas fa-file-upload fa-10x"></i>
                                {name ? <span data-testid="imageName" style={imageNameStyle}>{name}</span> : <span>Choose a file...</span>}
                            </label>
                            {error ? 
                                <div className="upload-error" style={submitBtnStyle}>{error}</div>
                                :
                                <button type="submit" className="btn" style={submitBtnStyle} id="upload-btn"  name="action">Upload</button>
                            }
                        </form>
                    </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    uploadError: state.faces.uploadError
})

export default connect(mapStateToProps, { getFaces, clearUploadError })(ImageUploader);