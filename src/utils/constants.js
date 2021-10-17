export const beatfilmApiURL = 'https://api.nomoreparties.co';
export const mainApiURL = 'https://api.watchthis.nomoredomains.club';

export const errors = {
  minPassLength: 'Длина пароля должна быть более восьми символов.',
  isValidEmail: 'Введен некорректный имейл.',
  minNameLength: 'Длина имени не может быт короче двух символов.',
  required: 'Поле не должно быть пустым.',
  serverResponseErr: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  loginFail: 'Не удалось авторизоваться, прпробуйте еще раз.',
  emailBusy: 'Пользователь с таким имейлом уже зарегистрирован.',
  formatError: 'В имени допускается символы латиницы, кириллицы, пробел и тире.'
}

export const regexp = /^[а-яА-ЯёЁa-zA-Z \-]+$/;