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

export const beatfilmApiURL = 'https://api.nomoreparties.co/beatfilm-movies';
export const mainApiURL = 'https://api.watchthis.nomoredomains.club';

export const errors = {
  shortPass: 'Пароль должен быть длинной не менее 8 символов.',
  shortError: 'Имя не должно быть длинной менее чем 2 символа.',
  longError: 'Имя не должно быть длинной более чем 32 символа.',
  emailError: 'Неправильный формат E-mail',
  emptyError: 'Поле должно быть заполнено',
}