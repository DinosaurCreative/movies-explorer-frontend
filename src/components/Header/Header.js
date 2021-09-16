import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
      <Link to="/" href="#" className="logo logo_place_header" />
      <div className="header__links-container">
        <Link to="/movies" href="#" className="header__link" >{"Фильмы"}</Link>
        <Link to="/saved-movies" href="#" className="header__link" >{"Сохраненные фильльмы"}</Link>
        {/* <Link to="/signup" className="header__link header__link_registration" >{"Регистрация"}</Link>
        <Link to="/signin" className="header__link header__link_authorization" >{"Войти"}</Link> */}
      </div>
      <Link to="/saved-movies" href="#" className="header__account-btn" />
      </div>
    </header>
  );
};

export default Header;
