import React from 'react';
import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register'
function App() {

  return (
    <div className="page">
      <div className="page__container">
        { false && <Header />}
        { false && <Login />}
        { true && <Register />}
        { false && <Footer />}
      </div>

    </div>
  )

};

export default App;
