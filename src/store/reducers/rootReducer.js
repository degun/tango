import { combineReducers } from "redux";
import charactersReducer from './charactersReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    characters: charactersReducer,
    book: bookReducer
})

export default rootReducer;