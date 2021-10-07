import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formValues,  setFormValues ] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({...prevState, [name]: value }));
  }, [setFormValues]);

  const { email, password, name } = formValues;
  
  return (
    <div className='register'>
      <div className='form__container'>
      <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Добро пожаловать!</h1>
        <form className='form'>
          <span className='form__name-span'>Имя</span>
          <input className='form__input' required type='text' onChange={handleInputChange} name='userName' value={name} />
          <span className='form__error-span'></span>
          <span className='form__name-span'>E-mail</span>
          <input className='form__input' required type='email' onChange={handleInputChange} name='userEmail' value={email} />
          <span className='form__error-span'></span>
          <span className='form__name-span'>Пароль</span>
          <input className='form__input' required type='password' onChange={handleInputChange} name='userPassword' value={password} />
          <span className='form__error-span'></span>
        </form>
        <button className='form__button form__button_place_register'>Зарегистрироваться</button>
        <p className='from__status-ask'>Уже зарегистрированы?{<Link to='/signin' className='link link_place_form link_place_form-registration'>Войти</Link>}</p>
      </div>
    </div>
  )
}

export default Register;
