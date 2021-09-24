import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useState } from 'react';

function Header(props) {

  return (
    <header className='header'>
      <div className='header__container'>
      <Link to='/' href='#' className='logo logo_place_header' />
      {props.screenWidth < 768 && <button className='navigation__menu-btn' type='button' onClick={props.menuHandler} />}
      <div className='header__links-container'>
        <Navigation isOpen = {props.menuStatus}
                    menuHandler = {props.menuHandler}
                    screenWidth = {props.screenWidth}
        />
        {/* <Link className='link link_header-registration' to='/signup' href='#' >{'Регистрация'}</Link>
        <Link className='link link_header-authorization' to='/signin' href='#' >{'Войти'}</Link> */}
      </div>
      </div>
    </header>
  );
};

export default Header;
