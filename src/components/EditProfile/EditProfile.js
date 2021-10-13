import { Form, Field, SubmitButton } from '../../utils/Forms';
import validators from '../../utils/validators';
import { useState } from 'react';


function EditProfile() {
  const [emailError, setEmailError ] = useState(false);
  const [nameError, setNameError ] = useState(false);

  const errorMessageHandler = (props) => {
    for (const name in props.errors) {
      if(props.errors[name]) {
        return props.errorslist[name];
      }
    }  
  }

  const errorStatusHandler = (props) => {
    for(const name in props.errors) {
      if(props.errors[name]) {
        return true;
      }
    }
    return false;
  }

  const errorSpanHandler = (prop, status) => {
    if (prop === 'userEmail') {
      setEmailError(status);
      return;
    }
    if (prop === 'userName') {
      setNameError(status);
    }
  }

  return (
    <div className='edit-profile'>
      <div className='form__container form__container_place_edit'>
        <h1 className='form__greeting form__greeting_place_edit'>Редактирование профиля</h1>
        <Form className='form'
              type = 'submit'
              validators = {validators}>

          <Field className='form__input form__input_place_edit'
                 name='userEmail'
                 placeholder='E-mail'
                 type='email'>{
            ({ onChange, ...props}) => {
              return (<input
                        placeholder={props.placeholder}
                        className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                        onFocus={() => errorSpanHandler(props.name, true)}
                        onBlur={() => errorSpanHandler(props.name, false)}
                        onChange={(e) => onChange(e.target.value)}/>)
            }}</Field>

          <Field className='form__error-span'
                 name='userEmail'
                 errorslist = {{
                  required: 'Поле не должно быть пустым.',                      
                  isValidEmail: 'Введен некорректный имейл.',
                }}>
            {(props) => {
              return (<span {...props} 
                className = {`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)
          }}</Field>
          
          <Field className='form__input form__input_place_edit'
                 name='userName'
                 placeholder='Имя'
                 type='text'>{
                  ({ onChange, ...props}) => {
                    return (<input 
                              placeholder={props.placeholder}
                              className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                              onFocus={() => errorSpanHandler(props.name, true)}
                              onBlur={() => errorSpanHandler(props.name, false)}
                              onChange={(e) => onChange(e.target.value)}/>)
          }}</Field>
          
          <Field className='form__error-span'
                 name='userName'
                 errorslist = {{
                 required: 'Поле не должно быть пустым.',                      
                 minLength: 'Длина имени не может быть короче двух символов.',
                }}>
            {(props) => {
              return (<span {...props} 
                className = {`${props.className} ${!nameError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)
          }}</Field>
          <SubmitButton className = 'form__button' 
                        type = 'submit'>{
            ({ disabled , ...props}) => {
              return (<button {...props} 
                     className={`${props.className} ${disabled && 'form__button_type_disabled'}`}
                     disabled={disabled}>
                     {'Сохранить'}
                     </button>)
          }}</SubmitButton>        
        </Form>
      </div>
    </div>
  )
}

export default EditProfile;