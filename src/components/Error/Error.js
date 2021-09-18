import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

function Error() {
  return (
    <div className="error">
      <div className='error__container'>
        <div className='error__text-container'>
          <h1 className='error__title'>404</h1>
          <p className='error__caption'>Страница не найдена</p>
        </div>
        <Link to='/' href='#' className='error__link'>Назад</Link>
      </div>
    </div>
  )
}

export default Error;