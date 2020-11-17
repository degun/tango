import { GET_CHARACTERS, GET_CHARACTERS_SUCCESS, GET_CHARACTERS_ERROR } from '../types';

const init = {
    characters: [],
    err: "",
    loading: false,
    lastPage: 1
} //defaults

function charactersReducer(state = init, action) {
    switch(action.type){
        case GET_CHARACTERS:
            return {
                ...state, 
                loading: true //start loading on start fetch
            }
        case GET_CHARACTERS_SUCCESS:
            return {
                ...state, 
                loading: false, //stop the loading
                err: "",        //reset errors (if any)
                characters: action.characters, //set the array of characters
                lastPage: action.lastPage     // and the calculated lastPage
            }
        case GET_CHARACTERS_ERROR:
            return {
                ...state, 
                loading: false, //stop loading
                err: action.err, //set the error message
                characters: [] //reset the characters value
            }
        default:
            return state
    }
}

export default charactersReducer;