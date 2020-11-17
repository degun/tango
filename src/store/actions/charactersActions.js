import { GET_CHARACTERS, GET_CHARACTERS_SUCCESS, GET_CHARACTERS_ERROR } from '../types';
import { API_ENDPOINT } from '../../config';
import axios from 'axios';

export const getCharacters = (page, perPage, gender, name) => {
    return dispatch => {
        dispatch({ type: GET_CHARACTERS }); // we announce that fetching has just started
        return axios.get(`${API_ENDPOINT}/characters?page=${page}&pageSize=${perPage}&gender=${gender}&name=${name}`).then(({data, headers}) => { 
            const { link } = headers; // get the link header, where the lastPage is located
            const lastString = link.split(",").pop(); // get the last item, containing the 'last' keyword
            const foundWithRegex = lastString.match(/page=.*&/g)[0]; //use a regex to find the interesting part
            const lastPage = parseInt(foundWithRegex.replace("page=", "").replace("&", "")); //strip it from unnecessary text and parse from string to int
            const characters = data.map(({name, aliases, books, culture, gender, tvSeries}) => {
                return {
                    nameAndAliases: [name, ...aliases].filter(name => name).join(", "),
                    gender: gender ? gender : "Unknown",
                    culture: culture ? culture : "Unknown",
                    listOfBooks: books.map(book => book.split("/").pop()),
                    nrOfSeries: tvSeries.filter(seri => seri).length
                } // map the data to our desired format
            })
            dispatch({ type: GET_CHARACTERS_SUCCESS, characters, lastPage }) //signal a success fetch, and pass the array of characters and the calculated last page
        })
        .catch(({message}) => {
            dispatch({ type: GET_CHARACTERS_ERROR, err: message }) //signal that fetching has encountered an error
        })
    };
};