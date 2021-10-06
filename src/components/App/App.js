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
import { Route, Switch, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {
  const location = useLocation();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const [ unknownPathError, setUnknownPathError ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(document.documentElement.clientWidth);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  // const [ currentUser, setCurrentUser ] = useState({ name: '', email: '', id: ''});

  useEffect(() => {
    window.addEventListener('resize', handleWidth, { passive: true });
    return () => {
      window.removeEventListener('rezize', handleWidth);
    };
  }, []);

  const handleWidth = () => {
    setScreenWidth(document.documentElement.clientWidth);
  };

  function menuOpenHandler() {
    setIsMenuOpen(!isMenuOpen);
  }
  
  return (
     <CurrentUserContext.Provider value={'currentUser'}>
      <div className='page'>{
        isModalOpen && <ModalPopup closeModal = {setIsModalOpen}
                                  isModalOpen = { isModalOpen }
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
              <Movies />
            </Route>
            
            <Route  path='/profile'>
              <Profile />
            </Route>
            <Route  path='/saved-movies'>
              <SavedMovies />
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
    </CurrentUserContext.Provider>
  )

};

export default App;
