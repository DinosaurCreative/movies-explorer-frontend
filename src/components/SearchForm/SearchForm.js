import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
      <form className='search-form'>
        <input className='search-form__input' placeholder='Фильм' />
        <button className='search-form__button' type='submit' />
        <div className='search-form__border' />
        <input className='search-form__checkbox' type='checkbox' />
        <p className='search-form__checkbox-caption'>Короткометражки</p>
      </form>
  )
}

export default SearchForm;
