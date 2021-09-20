import React from 'react';
import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portfolio';
import AboutMe from './AboutMe/AboutMe';

function Main() {
  return (
    <div className='main'>
      <div className='main__container'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>

    </div>
  )
}

export default Main;
