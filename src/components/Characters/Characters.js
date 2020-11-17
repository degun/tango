import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharacters } from '../../store/actions/charactersActions';
import Spinner from '../_common/Spinner';
import './Characters.sass';

function Characters(){
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [perPage, setPerpage] = useState(10);
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");

    const { characters, lastPage, err, loading } = useSelector(state => state.characters); //get the variables from the redux store

    useEffect(() => {
        dispatch(getCharacters(page, perPage, gender, name))
    }, [page, perPage, gender, name]) //whenever one of these parameter changes, a getCharacters action is dispatched

    if(loading){return <Spinner />}

    return (
        <div id="Characters">
            <header>
                <input value={name} onChange={({target}) => {setName(target.value);if(target.value)setPage(1)}} type="text" placeholder="Search by name" />
                <select value={gender} onChange={({target}) => setGender(target.value)} name="gender" id="gender">
                    <option selected disabled hidden value="">Select gender</option>
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </header>
            <main>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name and aliases</th>
                                <th>Gender</th>
                                <th>Culture</th>
                                <th>List of books</th>
                                <th>Seasons in</th>
                            </tr>
                        </thead>
                        <tbody>
                            {characters.map(({nameAndAliases, gender, culture, listOfBooks, nrOfSeries}, i) => <tr key={`character-${i}`}>
                                <td>{nameAndAliases}</td>
                                <td>{gender}</td>
                                <td>{culture}</td>
                                <td>{listOfBooks.map((id, i) => <Link title="Go to book" to={`/books/${id}`}>{id}{i !== (listOfBooks.length - 1) ? "," : ""}</Link>)}</td>
                                <td>{nrOfSeries}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <div className="buttons">
                        <div className={page === 1 ? "inactive" : ""} onClick={() => setPage(1)}>First</div>
                        <div className={page === 1 ? "inactive" : ""} onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</div>
                        <div>{page}</div>
                        <div className={page === lastPage ? "inactive" : ""} onClick={() => setPage(page === lastPage ? lastPage : page + 1)}>Next</div>
                        <div className={page === lastPage ? "inactive" : ""} onClick={() => setPage(lastPage)}>Last</div>
                    </div>
                    <div className="per-page">
                        <span>Characters per page: </span>
                        <select value={perPage} onChange={({target}) => setPerpage(target.value)} name="perPage" id="perPage">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                </div>
                {err ? <div className="errors">{err}</div> : null}
            </main>
        </div>
    )
}

export default Characters;