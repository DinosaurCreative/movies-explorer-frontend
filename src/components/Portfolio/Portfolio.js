function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Статичный сайт</h3>
          <a className='portfolio__arrow' href='https://dinosaurcreative.github.io/how-to-learn/' name='ссылка на проект' target='_blanc' rel='noreferrer' />
        </div>
        <div className='portfolio__underline' />
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Адаптивный сайт</h3>
          <a className='portfolio__arrow' href='https://dinosaurcreative.github.io/russian-travel/' name='ссылка на проект' target='_blanc' rel='noreferrer' />
        </div>
        <div className='portfolio__underline' />
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Одностраничное приложение</h3>
          <a className='portfolio__arrow' href='https://look-around-two.vercel.app/' name='ссылка на проект' target='_blanc' rel='noreferrer' />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
