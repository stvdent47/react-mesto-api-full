import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { useForm } from '../hooks/useForm.js';

const AddPlacePopup = (props) => {
  const { values, setValues, handleInputChange } = useForm();

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name: values.place,
      link: values.link,
    });

    setValues({});
  };

  return (
    <PopupWithForm
      name='add-modal'
      title='Новое место'
      submitButtonState={props.submitButtonState}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
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
          <p className='modal__input-error-message' id='place-name-error'></p>

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
          <p className='modal__input-error-message' id='place-link-error'></p>
        </>
      }
    />
  );
};

export default AddPlacePopup;
