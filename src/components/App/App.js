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
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';
import ProtectedRoute from  '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/mainApi';
import auth from '../../utils/auth';
import { errors } from '../../utils/constants';

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(document.documentElement.clientWidth);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalError, setModalError ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isPreloaderShowing, setIsPreloaderShowing ] = useState(false);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ backToSavedMovies, setBackToSavedMovies ] = useState(false);
  const [ isResetButtonPushed, setIsResetButtonPushed ] = useState(false)
  const [ isLogged, setIsLogged ] = useState(false);
  const location = useLocation();
  const uploadingCards = screenWidth < 480 ? 5 : screenWidth < 769 ? 8 : 12;
  const uploadCardsQunt = screenWidth < 769 ? 2 : 3;
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    window.addEventListener('resize', handleWidth, { passive: true });
    return () => {
      window.removeEventListener('rezize', handleWidth);
    };
  }, []);
 
  function handleCheckToken() {
    auth.checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLogged(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          setIsLogged(false);
        };
      })
  };

  function getProfileDataHandler() {
    mainApi.getProfileData()
      .then((res) => {
        setCurrentUser(res);
        history.push('/movies')
      })
      .catch(() => {
        showServerErrorHandler(errors.emailBusy)
      })
  }

  function getSavedMoviesHandler() {
    mainApi.getMovies()
      .then((res) => {
        setSavedMovies(sortSavedCards(res.data));
      })
      .catch(() => {
        showServerErrorHandler(errors.emailBusy);
      })
  };

  function sortSavedCards(value) {
    const userId = localStorage.getItem('userId');
    return value.filter(item => {
      if(item.owner === userId) {
        return item;
      }
    })
  }

  useEffect(() => {
    if(isLogged) {
      getProfileDataHandler();
    }
  }, []);

  useEffect(() => {
    if(isLoggedIn){
      getSavedMoviesHandler();
      handleCheckToken();
      setIsResetButtonPushed(false);
    }
  }, []);

  function handleSignUp({ name, password, email }) {
    auth.signUp({ name, password, email: email.toLowerCase() })
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => {
        if (err === 409) {
          showServerErrorHandler(errors.emailBusy);
        } else {
          showServerErrorHandler(errors.serverResponseErr);
        }
      })
  };
  
  function handleSignIn({ email, password }) {
    auth.signIn({ email: email.toLowerCase(), password })
      .then((res) => {
        localStorage.setItem('userId', res._id);
        getSavedMoviesHandler();
        handleCheckToken();
        localStorage.setItem('isLoggedIn', true);
        setIsLogged(true);
        history.push('/movies')
      })
      .catch(() => {
        showServerErrorHandler(errors.loginFail);
      })
  };

  function handleWidth() {
    setScreenWidth(document.documentElement.clientWidth);
  };

  function menuOpenHandler() {
    setIsMenuOpen(!isMenuOpen);
  };
  
  function showServerErrorHandler(error) {
    setIsModalOpen(true);
    setModalError(error);
  };

  function hideServerErrorHandler() {
    setIsModalOpen(false);
    setModalError('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>{
          isModalOpen && <ModalPopup closeModal={hideServerErrorHandler}
                                     isModalOpen={isModalOpen}
                                     error={modalError} />
          }<div className={`page__container ${isMenuOpen && screenWidth < 769 ? 'page__container_dark' : ''}`}>
            { location.pathname !== '/signin'
            && location.pathname !== '/signup'
            && <Header menuHandler={menuOpenHandler}
                       menuStatus={isMenuOpen}
                       screenWidth={screenWidth}
                       isMenuOpen={isMenuOpen}
                       isLoggedIn={isLogged} />}
            <Switch>
              <Route  exact path='/'>
                <Main />
              </Route>
              
              <ProtectedRoute component={EditProfile}
                              path='/edit-profile'
                              isLoggedIn={isLoggedIn}
                              setCurrentUser={setCurrentUser}
                              showServerErrorHandler={showServerErrorHandler} />
              
              <ProtectedRoute component={Movies}
                              path='/movies'
                              setMovies={setMovies}
                              movies={movies}
                              showServerErrorHandler={showServerErrorHandler}
                              screenWidth={screenWidth}
                              isPreloaderShowing={isPreloaderShowing}
                              setIsPreloaderShowing={setIsPreloaderShowing}
                              uploadingCards={uploadingCards}
                              uploadCardsQunt={uploadCardsQunt}
                              isLoggedIn={isLoggedIn}
                              savedMovies={savedMovies}
                              setSavedMovies={setSavedMovies} />
              
              <ProtectedRoute component={SavedMovies}
                              path='/saved-movies'
                              isLoggedIn={isLoggedIn}
                              isPreloaderShowing={isPreloaderShowing}
                              setIsPreloaderShowing={setIsPreloaderShowing}
                              showServerErrorHandler={showServerErrorHandler}
                              savedMovies={savedMovies}
                              setSavedMovies={setSavedMovies}
                              setMovies={setMovies} 
                              setBackToSavedMovies={setBackToSavedMovies}
                              backToSavedMovies={backToSavedMovies}
                              setIsResetButtonPushed={setIsResetButtonPushed}
                              isResetButtonPushed={isResetButtonPushed} />

              <ProtectedRoute component={Profile}
                              path='/profile'
                              isLoggedIn={isLoggedIn}
                              currentUser={currentUser}
                              setIsLogged={setIsLogged}
                              showServerErrorHandler={showServerErrorHandler} />

              <Route path = '/signin'>
                <Login onSubmit={handleSignIn} />
              </Route>
              
              <Route path = '/signup'>
                <Register onSubmit={handleSignUp} />
              </Route>
            
              <Route path="" component={Error} />
            </Switch>
            { location.pathname !== '/profile'
            && location.pathname !== '/signin'
            && location.pathname !== '/signup'
            && location.pathname !== '/edit-profile'
            && <Footer />}
            <ScrollUp />
          </div>
        </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
