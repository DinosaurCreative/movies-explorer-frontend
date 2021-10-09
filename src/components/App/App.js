/* eslint-disable no-unused-vars */
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
import ScrollUp from '../ScrollUp/ScrollUp';
import EditProfile from '../EditProfile/EditProfile';
import ModalPopup from '../ModalPopup/ModalPopup';
import mainApi from '../../utils/mainApi';
import movieApi from '../../utils/movieApi';

import { Route, Switch, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext, MoviesContext } from '../../contexts/contexts';


function App() {
  const location = useLocation();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const [ unknownPathError, setUnknownPathError ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(document.documentElement.clientWidth);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalError, setModalError ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({ name: '', email: '', id: '' });
  // useEffect(() => {
  //     console.log(typeof movies);
  //     console.log(movies)
  // }, [movies]);

  useEffect(() => {
    window.addEventListener('resize', handleWidth, { passive: true });
    return () => {
      window.removeEventListener('rezize', handleWidth);
    };
  }, []);

  const handleWidth = () => {
    setScreenWidth(document.documentElement.clientWidth);
  };

  const menuOpenHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  
  const showServerErrorHandler = (error) => {
    setIsModalOpen(true);
    setModalError(error);
  }
  const hideServerErrorHandler = () => {
    setIsModalOpen(false);
    setModalError('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MoviesContext.Provider value={movies}>  
        <div className='page'>{
          isModalOpen && <ModalPopup closeModal = {hideServerErrorHandler}
                                    isModalOpen = { isModalOpen }
                                    error={modalError}
          />
          }{unknownPathError ? <Error pathErrorHandler = {setUnknownPathError}
            />
          :<div className={`page__container ${isMenuOpen && screenWidth < 769 ? 'page__container_dark' : ''}`}>
            { location.pathname !== '/signin' 
            && location.pathname !== '/signup' 
            && <Header menuHandler = {menuOpenHandler}
                      menuStatus = {isMenuOpen}
                      screenWidth = {screenWidth}
                      isMenuOpen = {isMenuOpen}
            />}
            <Switch>
              <Route  exact path='/'>
                <Main />
              </Route>
              <Route path='/edit-profile'>
                <EditProfile />
              </Route>
              <Route  path='/movies'>
                <Movies setMovies={setMovies}
                        showServerErrorHandler={showServerErrorHandler}/>
              </Route>
                
              <Route  path='/saved-movies'>
                <SavedMovies />
              </Route>
              <Route  path='/profile'>
                <Profile />
              </Route>
              <Route path = '/signin'>
                <Login />
              </Route>
              
              <Route path = '/signup'>
                <Register />
              </Route>
            </Switch>
            { location.pathname !== '/profile' 
            && location.pathname !== '/signin' 
            && location.pathname !== '/signup' 
            && location.pathname !== '/edit-profile' 
            && <Footer />}
            <ScrollUp />
          </div>}
        </div>
      </MoviesContext.Provider>
    </CurrentUserContext.Provider>
  )

};

export default App;
