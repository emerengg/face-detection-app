import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getFaces, clearUploadError } from '../actions/faces'


class ImageUploader extends Component {
    
    state = {
        image: null,
        name: null,
        status: false,
        error: null
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
                status: false,
                error: uploadError
            }, () => {
                const { uploadError } = this.props
                uploadError !== null && this.props.clearUploadError() 
            })
        }
    }

    handleSelectedFile = (e) => {
        try{
            const imageFile = e.target.files[0]
            const fileName = e.target.files[0].name

            const idxDot = fileName.lastIndexOf(".") + 1;
            const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

            if (extFile === "jpg" || extFile === "jpeg" || extFile === "png"){ 
                const fr = new FileReader();

                fr.onload = () => {
                    const img = new Image();
        
                    img.onload = () => {
                    };
        
                    img.src = fr.result;
                };
        
                fr.readAsDataURL(imageFile);

                const shortenedName = fileName.length <= 10 ? fileName : `${fileName.substring(0, 9)}...`;
                
                this.setState({
                    image: imageFile,
                    name: shortenedName,
                    error: null
                })
            }else{
                this.setState({   
                    image: null,
                    name: null,
                    status: false,
                    error: "Only jpg/jpeg and png files are allowed!"
                })
            }
        }catch(error) {
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { image } = this.state
        const img = { image }
        this.props.getFaces(img);
        this.setState({
            status: !this.state.status
        })
    }

    render() {
        const { name, error } = this.state

        const submitBtnStyle = name || error ? { visibility: "visible" } : { visibility: "hidden" };

        return (
            <>
                {!this.state.status ?
                        <div className="upload-form">
                            <form onSubmit={this.handleSubmit} data-testid="image-upload-form">
                                <input type="file" className="inputfile" id="imageUpload" onChange={this.handleSelectedFile} data-testid="imageUpload"/>
                                <label className="upload" htmlFor="imageUpload">
                                    <i className="ico fas fa-file-upload fa-10x"></i>
                                    {name ? <span data-testid="imageName">{name}</span> : <span>Choose a file...</span>}
                                </label>
                                {error ? 
                                    <div className="upload-error" style={submitBtnStyle}>{error}</div>
                                    :
                                    <button type="submit" className="btn" style={submitBtnStyle} id="upload-btn"  name="action">Upload</button>
                                }
                            </form>
                        </div>
                    :   
                        <div className="loading" data-testid="loading">
                            <div className="loader"></div>
                        </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    uploadError: state.faces.uploadError
})

export default connect(mapStateToProps, { getFaces, clearUploadError })(ImageUploader);