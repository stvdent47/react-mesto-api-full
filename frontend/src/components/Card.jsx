import React from 'react';

const Card = React.memo((props) => {
  const isOwner = props.card.owner === props.currentUser.id;
  const cardDeleteButtonClassName = `photo-elements__delete-button ${!isOwner && 'photo-elements__delete-button_hidden'}`;

  const isLiked = props.card.likes.some((i) => i === props.currentUser.id);
  const cardLikeButtonClassName = `photo-elements__like-button ${isLiked && 'photo-elements__like-button_active'}`;

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <li className='photo-elements__item'>
      <img
        className='photo-elements__image'
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />

      <div className='photo-elements__caption'>
        <h2 className='photo-elements__text'>{props.card.name}</h2>
        <div className='photo-elements__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Нравится'
            onClick={()=> {
              props.onCardLike(props.card, props.currentUser.id);
            }}
          ></button>
          <p className='photo-elements__like-counter'>
            {props.card.likes.length}
          </p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          aria-label='Удалить'
          onClick={() => {
            props.onCardDelete(props.card, props.currentUser.id);
          }}
        ></button>
      </div>
    </li>
  );
});

export default Card;
