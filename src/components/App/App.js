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
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';
import ProtectedRoute from  '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/mainApi';
import auth, { signIn } from '../../utils/auth';
import { errors } from '../../utils/constants';


function App() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ unknownPathError, setUnknownPathError ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(document.documentElement.clientWidth);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalError, setModalError ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({ name: '', email: '', id: '' });
  const [ isPreloaderShowing, setIsPreloaderShowing ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const location = useLocation();
  const uploadingCards = screenWidth < 480 ? 5 : screenWidth < 769 ? 8 : 12;
  const uploadCardsQunt = screenWidth < 769 ?  2 : 3;
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('resize', handleWidth, { passive: true });
    return () => {
      window.removeEventListener('rezize', handleWidth);
    };
  }, []);
 
  function handleCheckToken() {
    auth.checkToken()
      .then(() => {
        console.log('yes')
        setIsLoggedIn(true);
      })
      .catch(() => {
        console.log('no')
        setIsLoggedIn(false);
      })
  }

  // useEffect(() => {
  //   console.log(location.pathname)
  //   handleCheckToken();
  // }, [location.pathname])

  // useEffect(() => {
  //   if(isLoggedIn) {
  //     mainApi.getProfileData()
  //       .then((res) => {
  //         setCurrentUser(res);
  //         history.push('/movies')
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         showServerErrorHandler(err)
  //       })
  //   }
  // }, [isLoggedIn])

  function handleSignUp({ name, password, email }) {
    auth.signUp({ name, password, email })
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err)
        showServerErrorHandler(err);
      })
  }
  
  function handleSignIn({ email, password }) {
    signIn({ email, password })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err);
        showServerErrorHandler(errors.loginFail);
      })
  }   

  function handleWidth() {
    setScreenWidth(document.documentElement.clientWidth);
  };

  function menuOpenHandler() {
    setIsMenuOpen(!isMenuOpen);
  }
  
  function showServerErrorHandler(error) {
    setIsModalOpen(true);
    setModalError(error);
  }

  function hideServerErrorHandler() {
    setIsModalOpen(false);
    setModalError('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>{
          isModalOpen && <ModalPopup closeModal={hideServerErrorHandler}
                                     isModalOpen={ isModalOpen }
                                     error={modalError}
          />
          }{unknownPathError ? <Error pathErrorHandler = {setUnknownPathError}
            />
          :<div className={`page__container ${isMenuOpen && screenWidth < 769 ? 'page__container_dark' : ''}`}>
            { location.pathname !== '/signin' 
            && location.pathname !== '/signup' 
            && <Header menuHandler={menuOpenHandler}
                      menuStatus={isMenuOpen}
                      screenWidth={screenWidth}
                      isMenuOpen={isMenuOpen}
                      isLoggedIn={isLoggedIn}/>}
            <Switch>
                <Route  exact path='/'>
                  <Main />
                </Route>
              <ProtectedRoute component={EditProfile}
                              path='/edit-profile' 
                              isLoggedIn={isLoggedIn}/>
              
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
                              isLoggedIn={isLoggedIn} />
              
              <ProtectedRoute component={SavedMovies}
                              path='/saved-movies'
                              isLoggedIn={isLoggedIn}
                              isPreloaderShowing={isPreloaderShowing}
                              setIsPreloaderShowing={setIsPreloaderShowing}
                              showServerErrorHandler={showServerErrorHandler} />

              <ProtectedRoute component={Profile} 
                              path='/profile'
                              isLoggedIn={isLoggedIn} />

              <Route path = '/signin'>
                <Login onSubmit={handleSignIn}/>
              </Route>
              
              <Route path = '/signup'>
                <Register onSubmit={handleSignUp}/>
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
