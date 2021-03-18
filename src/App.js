import './App.css';
import Home from './Components/Home';
import { Router } from '@reach/router';
import Search from './Components/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Search path="/search/:type/:id" />
      </Router>
    </div>
  );
}

export default App;
