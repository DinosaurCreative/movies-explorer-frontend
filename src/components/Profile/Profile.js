import { Link } from 'react-router-dom';
import { useContext  } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className='profile'>
      <div className='profile__container'>
        <h1 className='profile__greeting'>Привет, {'Герман'}!</h1>
        <div className='profile__data-container'>
          <div className='profile__name-container'>
            <p className='profile__name-title'>Имя</p>
            <p className='profile__name'>{currentUser.name}</p>
          </div>
          <div className='profile__underline' />
          <div className='profile__email-container'>
            <p className='profile__email-title'>E-mail</p>
            <p className='profile__email'>{currentUser.email}</p>
          </div>
        </div>
        <div className='profile__links'>
          <Link to='/edit-profile' hef='#' className='link link_place_profile'>Редактировать</Link>
          <Link to='/signin' hef='#' className='link link_place_profile'>Выйти из аккаунта</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile;