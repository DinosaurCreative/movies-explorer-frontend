import validator from 'validator';

const validators = {
  email: {
    required(value){
      return value === '';
    },
    isValidEmail(value){
      return !validator.isEmail(value);
    } 
  },
  password: {
    required(value){
      return value === '';
    },
    minLength(value){
      return value.length < 8;
    }
  },
  name: {
    required(value){
      return value === '';
    },
    minLength(value){
      return value.length < 2;
    }
  },
  userMovie: {
    required(value){
      return value === '';
    }
  }
}

export default validators;