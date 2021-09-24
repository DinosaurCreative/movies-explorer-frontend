function EditProfile() {
  return (
    <div className='edit-profile'>
      <div className='form__container form__container_place_edit'>
        <h1 className='form__greeting form__greeting_place_edit'>Редактирование профиля</h1>
        <form className='form'>
          <input className='form__input form__input_place_edit' placeholder='E-mail' type='email' />
          <span className='form__error-span'></span>
          <input className='form__input form__input_place_edit' placeholder='Имя' type='text' />
          <span className='form__error-span'></span>
        </form>
        <button className='form__button' type='submit'>Сохранить</button>
      </div>
    </div>
  )
}

export default EditProfile;