import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Статичный сайт</h3>
          <Link to='/' href='#' className='portfolio__arrow' />
        </div>
        <div className='portfolio__underline' />
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Адаптивный сайт</h3>
          <Link to='/' href='#' className='portfolio__arrow' />
        </div>
        <div className='portfolio__underline' />
        <div className='portfolio__links'>
          <h3 className='portfolio__link'>Одностраничное приложение</h3>
          <Link to='/' href='#' className='portfolio__arrow' />
        </div>
      </div>
    </div>
  )
}

export default Portfolio;
