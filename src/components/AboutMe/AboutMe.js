import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <div className='about-me'>
      <div className='about-me__container'>
        <h2 className='block-title'>Студент</h2>
        <div className='about-me__info-container'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>Герман</h3>
            <p className='about-me__additional-info'>Фронтенд-разработчик, 33 года</p>
            <p className='about-me__personal'>
              Я родился и живу в Санкт-Петербурге, закончил факультет режиссуры. У меня есть 
              жена и кот. Катаюсь н сноуборде, играю на гитаре а ещё увлекаюсь .
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб-разработке,
            </p>
            <div className='about-me__connections'>
              <Link to='/' href='#' className='link link_place_about-me'>Facebook</Link>
              <Link to='/' href='#' className='link link_place_about-me'>Github</Link>
            </div>
          </div>
          <div className='about-me__avatar' />
        </div>
      </div>
    </div>
  )
}

export default AboutMe;