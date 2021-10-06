import React, { useCallback, useContext, useEffect, useState } from "react";

const FormContext = React.createContext({});

export const Form = ({children, className, id, validators, onChange, onSubmit}) => {
  const [ formValues, setForValues ] = useState({});
  const [ isInvalid, setIsInvalid ] = useState(true);
  const [ formErrors, setFormErrors ] = useState({});

  const onChangeInput = useCallback((name, value) => {
    setForValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }, []);

  // useEffect(() => {
  //   onChange(formValues)
  // },[formValues, onChange])

  useEffect(() => {
    const formKeys = Object.keys(formValues); 
    const allErrors = formKeys.map((key) => {
      const ValueByKey = formValues[key];
      if(!validators[key]) {
        return {};
      }
      const errors = Object.entries(validators[key]).map(([ errorKey, validator ]) => {
        return { [errorKey]: validator(ValueByKey) }
      }).reduce((acc, item) => ({...acc, ...item}) , {});
      return { [key]: errors }
    }).reduce((acc, item) => ({...acc, ...item}), {});
    setFormErrors(allErrors);
  },[formValues, setFormErrors, validators])

  useEffect(() => {
    for (let fieldKey in formErrors) {
      const errorKeys = formErrors[fieldKey];
      
      for (let errorKey in errorKeys) {
        if (errorKeys[errorKey] ===  true) {
          return setIsInvalid(true);
        }
        setIsInvalid(false);
      }

    }
   
  }, [formErrors, setIsInvalid])

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formValues);
  }

  const formContextValue = {
    onChangeInput,
    isInvalid,
    formErrors,
    formValues,
  }; 
  
  return (
    <form className = {className}
          id = {id} 
          onSubmit = {handleSubmit}>
      <FormContext.Provider value={formContextValue}>
        {children}
      </FormContext.Provider>
    </form>
  );
};




export const Field = ({children, name, className, type, errorslist, id}) => {
  const [ value, setValue] = useState('');
  const { onChangeInput, formErrors, formValues } = useContext(FormContext);
  
  useEffect(() => {
    onChangeInput(name, value,);
  }, [value, name, onChangeInput ])
  
  return (
    children({
      name,
      className,
      type,
      errorslist,
      id,
      errors: formErrors[name],
      values: formValues[name],
      onChange: setValue,
    })
  )
}



export const SubmitButton = ({ children, className, type, form }) => {
  const { isInvalid } = useContext(FormContext);
  return (
    children({
      className,
      type,
      form,
      disabled: isInvalid,
    })
  )
}