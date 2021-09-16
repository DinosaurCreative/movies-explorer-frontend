import React from 'react';
import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';

function App() {

  return (
    <div className="page">
      <div className="page__container">
        { false && <Header />}
        { true && <Footer />}
        { false && <Login />}
      </div>

    </div>
  )

};

export default App;
