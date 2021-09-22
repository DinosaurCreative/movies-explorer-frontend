import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import './NavTab.css';

function NavTab() {
  return (
    <div className='navtab'>
      <Link className='navtab__link'
            href='#'
            to="about-project"
            smooth={true}
            duration= {500}>О проекте</Link>
      <Link className='navtab__link'
            href='#'
            to="techs"
            smooth={true}
            offset={-70}
            duration= {500}>Технологии</Link>
      <Link className='navtab__link'
            href='#'
            to="about-me"
            smooth={true}
            duration= {500}>Студент</Link>
    </div>
  )
}

export default NavTab;
