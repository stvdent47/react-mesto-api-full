import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
// import useForm from '../hooks/useForm.js';
import useFormWithValidation from '../hooks/useFormWithValidation.js';

const AddPlacePopup = (props) => {
  // const { values, setValues, handleInputChange } = useForm();
  const { values, setValues, handleInputChange, errors, isFormValid, resetForm } = useFormWithValidation();

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name: values.place,
      link: values.link,
    });

    resetForm();
  };

  useEffect(() => {
    resetForm();
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='add-modal'
      title='Новое место'
      submitButtonText={props.submitButtonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      isSubmitDisabled={!isFormValid}
      children={
        <>
          <input
            type='text'
            name='place'
            id='place-name-input'
            placeholder='Название'
            className='modal__input'
            required
            minLength='1'
            maxLength='30'
            autoComplete='off'
            value={values.place || ''}
            onChange={handleInputChange}
          />
          <p className={`modal__input-error-message ${errors.place && 'modal__input-error-message_visible'}`} id='place-name-error'>{errors.place}</p>

          <input
            type='url'
            name='link'
            id='place-link-input'
            placeholder='Ссылка на картинку'
            className='modal__input'
            required
            value={values.link || ''}
            onChange={handleInputChange}
          />
          <p className={`modal__input-error-message ${errors.link && 'modal__input-error-message_visible'}`} id='place-link-error'>{errors.link}</p>
        </>
      }
    />
  );
};

export default AddPlacePopup;
