import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
      <Link to='/' href='#' className='logo logo_place_header' />
      <div className='header__links-container'>
        <Navigation />
        {false && <Link className='link link_header-registration' to='/signup' href='#' >{'Регистрация'}</Link>}
        {false && <Link className='link link_header-authorization' to='/signin' href='#' >{'Войти'}</Link>}
      </div>
      <Link to='/profile' href='#' className='header__account-btn' />
      </div>
    </header>
  );
};

export default Header;
