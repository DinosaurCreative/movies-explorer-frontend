import React from 'react';
import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from './AboutProject/AboutProject';

function Main() {
  return (
    <div className='main'>
      <div className='main__container'>
        <Promo />
        <AboutProject />
      </div>

    </div>
  )
}

export default Main;
