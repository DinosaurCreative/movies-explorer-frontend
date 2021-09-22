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

function App() {

  return (
    <div className="page">
      <div className="page__container">
        { false && <Error />}
        { true && <Header />}
        { false && <Main />}
        { false && <Movies />}
        { true && <SavedMovies />}
        { false && <Profile />}
        { false && <Login />}
        { false && <Register />}
        { true && <Footer />}
      </div>
    </div>
  )

};

export default App;
