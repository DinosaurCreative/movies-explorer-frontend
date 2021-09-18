import React from 'react';
import { Link }  from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__rows">
          <p className="footer__author">&copy; 2021. Гимаев Герман</p>
          <ul className="footer__row-links">
            <Link to='/' href='#' className="footer__row-link">Яндекс.Практикум</Link>
            <Link to='/' href='#' className="footer__row-link">Github</Link>
            <Link to='/' href='#' className="footer__row-link">Facebook</Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer;
