import './App.css';
// import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

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

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile userName="Виталий" email="pochta@yandex.ru"/>
        </Route>

        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
