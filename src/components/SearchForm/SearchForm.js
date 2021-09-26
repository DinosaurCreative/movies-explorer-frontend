function SearchForm() {
  
  return (
    <div className='search-form__container'>
      <form className='search-form'>
        <input className='search-form__input' placeholder='Фильм' />
        <button className='search-form__button' type='submit' />
        <div className='search-form__border' />
        <input className='search-form__checkbox' type='checkbox' />
        <p className='search-form__checkbox-caption'>Короткометражки</p>
      </form>
    </div>
  )
}

export default SearchForm;
