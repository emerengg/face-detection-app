import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getFaces, clearUploadError } from '../../../actions/faces'


const Upload = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const uploadError = useSelector(state => state.faces.uploadError);
    useEffect(() => {
        if (uploadError !== null){
            setError(uploadError)
            dispatch(clearUploadError());
        } else {
            setImage(null);
            setName('');
            setIsLoading(false)
        }
    }, [uploadError])

    const handleSelectedFile = (e) => {
        try {
            const imageFile = e.target.files[0];
            const fileName = e.target.files[0].name;

            const shortenedName = fileName.length <= 20 ? fileName : `${fileName.substring(0, 19)}...`;
            const fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();

            if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png"){ 
                setImage(imageFile);
                setError(null);
            } else {
                setError("Only jpg/jpeg and png files are allowed!");
            }
            setName(shortenedName);
        } catch (err) {}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getFaces(image));
        setIsLoading(!isLoading);
    }

    const submitErrorStyle = name || error ? { visibility: "visible" } : { visibility: "hidden" };
    const imageNameStyle = name && error ? { color: "red" } : { color: "green" };

    return (
        <Fragment>
            {isLoading ?  
                <div className="loading" data-testid="loading">
                    <div className="loader"></div>
                </div>
                :
                <div className="upload-form">
                    <form onSubmit={handleSubmit} data-testid="image-upload-form">
                        <input type="file" className="inputfile" id="imageUpload" onChange={handleSelectedFile} data-testid="imageUpload"/>
                        <label className="upload" htmlFor="imageUpload">
                            <i className="ico fas fa-file-upload fa-10x"></i>
                            {name ? <span data-testid="imageName" style={imageNameStyle}>{name}</span> : <span>Choose a file...</span>}
                        </label>
                        {error ? 
                            <div className="upload-error" style={submitErrorStyle}>{error}</div>
                            :
                            <button type="submit" className="btn" style={submitErrorStyle} id="upload-btn"  name="action">Upload</button>
                        }
                    </form>
                </div>
            }
        </Fragment>
    );
}

export default Upload;