import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navigation(props) {
  
  function closeMenuHandler(e) {
    if (!e.srcElement.className.includes('navigation') || e.key === 'Escape') {
      window.removeEventListener('keydown', closeMenuHandler);
      window.removeEventListener('click', closeMenuHandler);   
   
      props.menuHandler();
    }
  }

  if(props.isOpen){
    window.addEventListener('click', closeMenuHandler);
    window.addEventListener('keydown', closeMenuHandler);
  }
  return (
    <div className={`navigation ${props.isOpen && props.screenWidth < 768 ? 'navigation_opened' : ''}`}>
        {props.screenWidth < 768 && <button className='navigation__close-menu' type='button' onClick={props.menuHandler}/>}
        {props.screenWidth < 768 && <h2 className='navigation__title'>Главная</h2>}
        <Link to='/movies' href='#' className={`link  ${props.screenWidth < 768 ? 'link__side-menu-opened': 'link_navigation'}`} onClick={props.menuHandler}>{'Фильм'}</Link>
        <Link to='/saved-movies' href='#' className={`link  ${props.screenWidth < 768 ? 'link__side-menu-opened' :'link_navigation'}`} onClick={props.menuHandler}>{'Сохраненные фильмы'}</Link>
        <Link to='/profile' href='#' className='navigation__account-btn' onClick={props.menuHandler}/>
    </div>
  )
}

export default Navigation;
