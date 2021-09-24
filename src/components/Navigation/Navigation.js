import { Link } from 'react-router-dom';

function Navigation(props) {
  return (
      <div className={`navigation ${props.isOpen && props.screenWidth < 768 ? 'navigation_opened' : ''}`}>
        {props.screenWidth < 768 && <button className='navigation__close-menu' type='button' onClick={props.menuHandler}/>}
        {props.isOpen && props.screenWidth < 768 && <h2 className='navigation__title'>Главная</h2>}
        <Link to='/movies' href='#' className={`link link_navigation ${props.screenWidth < 768 ? 'link__side-menu-opened': ''}`} onClick={props.menuHandler}>{'Фильмы'}</Link>
        <Link to='/saved-movies' href='#' className={`link link_navigation ${props.screenWidth < 768 ? 'link__side-menu-opened' :''}`} onClick={props.menuHandler}>{'Сохраненные фильмы'}</Link>
        <Link to='/profile' href='#' className='header__account-btn' onClick={props.menuHandler}/>
      </div>
  )
}

export default Navigation;
