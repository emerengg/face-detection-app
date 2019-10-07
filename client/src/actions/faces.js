import { GET_FACES, UPLOAD_ERROR, RESET_STORE, CLEAR_UPLOAD_ERROR } from "./types";

export const resetStore = () => dispatch => {
    dispatch({
        type: RESET_STORE
    })
}

export const getFaces = (file) => (dispatch, getState) => {

    const url = window.URL;
    const src = url.createObjectURL(file.image);

    const data = new FormData()
    data.append('img', file.image, file.image.name)

    const endpoint = 'http://127.0.0.1:8000/api/fd/'

    const lookupOptions = {
              method: "POST",
              body: data,
          };

    fetch(endpoint, lookupOptions)
        .then(res => {
            if(!res.ok){
                throw res;
            } else {
                return res.json();
            }
        })
        .then(res => {
            const objects = JSON.parse(res.cords);
            const settings = {
                minNeighbors: res.min_neighbors,
                scaleFactor: res.scale_factor
            }
            const unique_id = res.unique_id;
            const cords = objects.map(cord => {
                return {
                    x: cord.x,
                    y: cord.y,
                    w: cord.xw,
                    h: cord.yh
                }
            });

            const data = {
                id: unique_id,
                settings,
                cords,
                image: src
            }

            dispatch({
                type: GET_FACES,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: UPLOAD_ERROR
            })
        })
}

export const clearUploadError = () => (dispatch, getState) => {
    dispatch({
        type: CLEAR_UPLOAD_ERROR
    })
}