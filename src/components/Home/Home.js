import { Link } from 'react-router-dom';
import './Home.sass';

function Home() {
    return <div id="Home">
        <Link to="/characters">
            <button>View list of characters</button>
        </Link>
    </div>
}

export default Home;

