import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <div className='navtab'>
      <Link to='/' href='#' className='navtab__link'>О проекте</Link>
      <Link to='/' href='#' className='navtab__link'>Технологии</Link>
      <Link to='/' href='#' className='navtab__link'>Студент</Link>
    </div>
  )
}

export default NavTab;
