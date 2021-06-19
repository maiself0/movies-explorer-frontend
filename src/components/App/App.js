import './App.css';
// import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>



        <Route path="/movies"></Route>
        <Route path="/saved-movies"></Route>
        <Route path="/profile"></Route>
      </Switch>
    </div>
  );
}

export default App;
