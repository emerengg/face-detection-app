import { GET_FACES, UPLOAD_ERROR, RESET_STORE, CLEAR_UPLOAD_ERROR } from '../actions/types'

const initState = {
    data: {},
    uploadError: null
}

export default function(state = initState, action) {
    switch(action.type) {
        case GET_FACES:
            return {
                data: action.payload
            };
        case RESET_STORE:
            return {
                ...state,
                data: {}
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                uploadError: "Couldn't upload the image! Try again!"
            }
        case CLEAR_UPLOAD_ERROR:
            return {
                ...state,
                uploadError: null
            }
        default:
            return state;
    }
}
