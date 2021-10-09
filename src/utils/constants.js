import card1 from '../images/middleofnowhere.jpg';
import card2 from '../images/stones.jpg';
import card3 from '../images/eveningfrance.jpg';
import card4 from '../images/sameplace.jpg';
export const photos = [
  card1,
  card2,
  card3,
  card4,
];

export const beatfilmApiURL = 'https://api.nomoreparties.co';
export const mainApiURL = 'https://api.watchthis.nomoredomains.club';

export const errors = {
  minPassLength: 'Длина пароля должна быть более восьми символов.',
  isValidEmail: 'Введен некорректный имейл.',
  minNameLength: 'Длина имени не может быт короче двух символов.',
  required: 'Поле не должно быть пустым.',
  serverResponseErr: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
}
