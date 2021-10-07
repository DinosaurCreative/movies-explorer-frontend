import validator from 'validator';

const validators = {
  userEmail: {
    required(value){
      return value === '';
    },
    isValidEmail(value){
      return !validator.isEmail(value);
    } 
  },
  userPassword: {
    required(value){
      return value === '';
    },
    minLength(value){
      return value.length < 8;
    }
  },
  userName: {
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