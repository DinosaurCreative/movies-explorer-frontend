import { useState, useEffect} from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import AboutMe from '../AboutMe/AboutMe';
import { animateScroll as scroll } from "react-scroll";

function Main() {
  const [ scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  return (
    <div className='main'>
      <div className='main__container'>
        <Promo />
        <AboutProject 
          id='about-project'
        />
        <Techs 
          id='techs'
        />
        <AboutMe 
          id='about-me'
        />
        <Portfolio />
      </div>
      <button className={`scroll-up ${scrollPosition > 500 && 'scroll-up_visible'}`}  type='button' onClick={scroll.scrollToTop}>GO UP</button>
    </div>
  )
}

export default Main;
