import { GET_BOOK, GET_BOOK_SUCCESS, GET_BOOK_ERROR } from '../types';
import { API_ENDPOINT } from '../../config';
import axios from 'axios';
import moment from 'moment';

export const getBook = id => {
    return dispatch => {

        dispatch({ type: GET_BOOK }); // just before starting to fetch, we dispatch the GET_BOOK action, to signal that fetching has just started
        
        return axios.get(`${API_ENDPOINT}/books/${id}`).then(({data}) => {
            const { name, isbn, numberOfPages, released } = data; //get necessary variables from the fetched data
            const book = {
                name,
                isbn,
                numberOfPages,
                releaseDate: moment(released).format("DD MMM YYYY")
            };
            dispatch({ type: GET_BOOK_SUCCESS, book }) //dispatch the success action, along with the book data
        })
        .catch(({message}) => {
            dispatch({ type: GET_BOOK_ERROR, err: message })  //dispatch the error action, along with the error message
        })
    };
};