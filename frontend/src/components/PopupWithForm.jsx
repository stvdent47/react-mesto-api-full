import React from 'react';

const PopupWithForm = ({
  name,
  title,
  submitButtonText,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  children,
}) => {
  return (
    <div className={`modal ${name} ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__container'>
        <h2 className='modal__title'>{title}</h2>

        <form
          action='#'
          name={`form-${name}`}
          className='modal__form'
          method='POST'
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type='submit' className={`modal__button ${isSubmitDisabled && 'modal__button_disabled'}`} disabled={isSubmitDisabled}>
            {submitButtonText}
          </button>
        </form>

        <button
          className='modal__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;