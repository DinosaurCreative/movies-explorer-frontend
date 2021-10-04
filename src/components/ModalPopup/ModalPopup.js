function ModalPopup(props) {
  const closeMoldalHandle = () => {
    props.closeModal(false);
    document.removeEventListener('keyup', closeMoldalHandle);
    document.removeEventListener('click', closeMoldalHandle);
  }

  window.addEventListener('click', closeMoldalHandle);
  window.addEventListener('keydown', closeMoldalHandle);

  return (
    <div className='modal-popup'>
      <div className='modal-popup__container'>
        <p className='modal-popup__message'>Сервер ответил ошибкой: переданы некорректные данные.</p>
      </div>
    </div>
  )
}

export default ModalPopup;