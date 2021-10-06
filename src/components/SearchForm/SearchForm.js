import { useCallback, useState } from 'react';

function SearchForm() {
  
  const [formValue,  setFormValue ] = useState({
    movieName: '',
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue(prevState => ({...prevState, [name]: value }));
  }, [setFormValue]);

  const { movie } = formValue;

  return (
    <div className='search-form__container'>
      <form className='search-form'>
        <input className='search-form__input' required placeholder='Фильм' name='movieName' onChange={handleInputChange} value={movie} />
        <button className='search-form__button' type='submit' />
        <div className='search-form__border' />
        <div className='search-form__checkbox-container'>
          <input className='search-form__checkbox' type='checkbox' />
          <p className='search-form__checkbox-caption'>Короткометражки</p>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;