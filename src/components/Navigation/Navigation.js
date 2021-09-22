import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className='navigation'>
      <Link to='/movies' href='#' className='link link_navigation' >{'Фильмы'}</Link>
      <Link to='/saved-movies' href='#' className='link link_navigation' >{'Сохраненные фильмы'}</Link>
    </div>
  )
}

export default Navigation;
