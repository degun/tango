import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Characters from './components/Characters/Characters';
import Book from './components/Book/Book';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/books/:id" component={Book} />
      </Switch>
    </div>
  );
}

export default App;
