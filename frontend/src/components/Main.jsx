import React, { useContext, useEffect } from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import api from '../utils/Api.js';

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    props.renderCards();
  }, [])

  return (
    <>
      <Header page='feed' handleSignOut={props.handleSignOut} />
      <main className='main'>
        <section className='profile'>
          <div className='profile__photo-container' onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt='фото профиля' className='profile__photo' />
          </div>

          <div className='profile__info'>
            <div className='profile__title'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                className='profile__edit-button'
                type='button'
                aria-label='Редактировать'
                onClick={props.onEditProfile}
              ></button>
            </div>

            <p className='profile__description'>{currentUser.about}</p>
          </div>

          <button
            className='profile__add-button'
            type='button'
            aria-label='Добавить'
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className='photo-elements'>
          <ul className='photo-elements__list'>
            {props.cards.map((item) => {
              return (
                <Card
                  card={item}
                  key={item._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
