import React from 'react';
import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register'
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className='page'>
      <div className='page__container'>
        { true && <Header />}
        <Switch>
          <Route  path='/main'>
            { true && <Main />}
          </Route>
          
          <Route  path='/movies'>
            { true && <Movies />}
          </Route>
          
          <Route  path='/profile'>
            { true && <Profile />}
          </Route>

          <Route  path='/error'>
            { true && <Error />}
          </Route>
          <Route  path='/saved-movies'>
            { true && <SavedMovies />}
          </Route>
        </Switch>
        
        { false && <Login />}
        { false && <Register />}
        { false && <Footer />}
      </div>
    </div>
  )

};

export default App;
