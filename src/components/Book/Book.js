import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBook } from '../../store/actions/bookActions';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../_common/Spinner';
import './Book.sass';

function Book({match}){
    const {id} = match.params;
    const dispatch = useDispatch();
    const { book, err, loading } = useSelector(state => state.book);
    
    const { name, isbn, numberOfPages, releaseDate } = book; //getting the fetched book from the redux store

    useEffect(() => {
        dispatch(getBook(id))
    }, [id]) //we dispatch a getBook action on each id change, meaning on each route change

    if(loading){return <Spinner />}

    return (
        <div id="Book">
            <Link to="/characters">&lt; Back to characters</Link>
            <h1>Book details</h1>
            <div className="book-data">
                <div className="row">
                    <div className="description">Name:</div>
                    <div className="value">{name}</div>
                </div>
                <div className="row">
                    <div className="description">ISBN:</div>
                    <div className="value">{isbn}</div>
                </div>
                <div className="row">
                    <div className="description">Number of pages:</div>
                    <div className="value">{numberOfPages}</div>
                </div>
                <div className="row">
                    <div className="description">Release date:</div>
                    <div className="value">{releaseDate}</div>
                </div>
            </div>
            {err ? <div className="errors">{err}</div> : null}
        </div>
    )
}

export default withRouter(Book);