import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormWithValidation from '../hooks/useFormWithValidation.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  // const { values, setValues, handleInputChange } = useForm();
  const { values, setValues, handleInputChange, errors, isFormValid, resetForm } = useFormWithValidation();
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };
  
  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, props.isOpen, resetForm]);
  
  return (
    <PopupWithForm
      name='edit-modal'
      title='Редактировать профиль'
      submitButtonText={props.submitButtonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleEditSubmit}
      isSubmitDisabled={!isFormValid}
      children={
        <>
          <input
            type='text'
            name='name'
            id='profile-name-input'
            placeholder='Ваше имя'
            className='modal__input'
            required
            minLength='2'
            maxLength='40'
            autoComplete='off'
            value={values.name || ''}
            onChange={handleInputChange}
          />
          <p className={`modal__input-error-message ${errors.name && 'modal__input-error-message_visible'}`} id='profile-name-error'>{errors.name || ''}</p>
          <input
            type='text'
            name='about'
            id='profile-job-input'
            placeholder='Ваша профессия'
            className='modal__input'
            required
            minLength='2'
            maxLength='200'
            autoComplete='off'
            value={values.about || ''}
            onChange={handleInputChange}
          />
          <p className={`modal__input-error-message ${errors.about && 'modal__input-error-message_visible'}`} id='profile-job-error'>{errors.about || ''}</p>
        </>
      }
    />
  );
};
export default EditProfilePopup;
