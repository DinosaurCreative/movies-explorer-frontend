import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header_container">
      <Link to="/" href="#" className="header__logo" />
      <div className="header_links-container">
        <Link to="/movies" href="#" className="header__link" >{"Фильмы"}</Link>
        <Link to="/saved-movies" href="#" className="header__link" >{"Сохраненные фильльмы"}</Link>
        <Link to="/saved-movies" href="#" className="header__link" >{"Сохраненные фильльмы"}</Link>
      </div>
      </div>
    </header>
  );
};

export default Header;
