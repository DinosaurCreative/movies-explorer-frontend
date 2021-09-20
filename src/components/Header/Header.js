import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
      <Link to="/" href="#" className="logo logo_place_header" />
      <div className="header__links-container">
        {/* <Link to="/movies" href="#" className="link" >{"Фильмы"}</Link>
        <Link to="/saved-movies" href="#" className="link" >{"Сохраненные фильмы"}</Link> */}
        <Link to="/signup" className="link link_header-registration" >{"Регистрация"}</Link>
        <Link to="/signin" className="link link_header-authorization" >{"Войти"}</Link>
      </div>
      {/* <Link to="/saved-movies" href="#" className="header__account-btn" /> */}
      </div>
    </header>
  );
};

export default Header;
