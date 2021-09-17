import React from 'react';
import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register'
import Profile from '../Profile/Profile';
function App() {

  return (
    <div className="page">
      <div className="page__container">
        { true && <Header />}
        { false && <Profile />}
        { false && <Login />}
        { false && <Register />}
        { true && <Footer />}
      </div>

    </div>
  )

};

export default App;
