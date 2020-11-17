import { GET_BOOK, GET_BOOK_SUCCESS, GET_BOOK_ERROR } from '../types';

const init = {
    book: {},
    err: "",
    loading: false
} //default values

function bookReducer(state = init, action) {
    switch(action.type){
        case GET_BOOK:
            return {
                ...state, 
                loading: true //start loading on start fetch
            }
        case GET_BOOK_SUCCESS:
            return {
                ...state, 
                loading: false, //stop the loading
                err: "",        //reset errors (if any)
                book: action.book  //and set the book data to the redux variable
            } 
        case GET_BOOK_ERROR:
            return {
                ...state, 
                loading: false, //stop the loading
                err: action.err, //set eventual errors 
                book: {} //reset book object
            }
        default:
            return state
    }
}

export default bookReducer;