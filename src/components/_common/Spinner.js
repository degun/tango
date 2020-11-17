import spinner from '../../images/spinner.gif';
import './Spinner.sass';

function Spinner(){
    return(
        <div className="Spinner">
            <img className="spinner" src={spinner} alt="loading icon" />
        </div>
    )
}

export default Spinner;