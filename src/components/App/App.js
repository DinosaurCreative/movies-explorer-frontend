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
import AboutProject from '../AboutProject/AboutProject'
import ScrollUp from '../ScrollUp/ScrollUp';
import { Route, Switch, useLocation } from 'react-router-dom';
function App() {
  
  const location = useLocation();
  
  return (
    <div className='page'>
      <div className='page__container'>
        { location.pathname !== '/signin' 
        && location.pathname !== '/signup' 
        && <Header />}
        <Switch>
          <Route  path='/main'>
            <Main />
          </Route>

          
          <Route  path='/movies'>
            <Movies />
          </Route>
          
          <Route  path='/profile'>
            <Profile />
          </Route>

          <Route  path='/error'>
            <Error />
          </Route>
          <Route  path='/saved-movies'>
            <SavedMovies />
          </Route>
          
          <Route  exact path='/'>
            <AboutProject />
          </Route>

          <Route path = '/signin'>
            <Login />
          </Route>
          
          <Route path = '/signup'>
            <Register />
          </Route>
        </Switch>
        <ScrollUp />
        { location.pathname !== '/profile' 
        && location.pathname !== '/signin' 
        && location.pathname !== '/signup' 
        && <Footer />}
      </div>
    </div>
  )

};

export default App;
