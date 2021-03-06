import React, { useState, useEffect } from 'react';
import Main from './Main.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

const App = () => {
  /**
   * user states
   */
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    about: '',
    avatar: '',
    id: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  /**
   * profile editing
   */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [editSubmitButtonText, seteditSubmitButtonText] = useState('Сохранить');

  const openEditProfileModal = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleUpdateUser = (data) => {
    seteditSubmitButtonText('Сохранение...');
    api
      .updateUser(data)
      .then((res) => {
        const { name, about } = res;
        setCurrentUser({
          ...currentUser,
          name,
          about,
        });
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        seteditSubmitButtonText('Сохранить');
      });
  };
  /**
   * avatar updating
   */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [avatarUpdateSubmitButtonState, setAvatarUpdateSubmitButtonState] = useState('Сохранить');

  const openEditAvatarModal = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleUpdateAvatar = ({ avatarUrl }) => {
    setAvatarUpdateSubmitButtonState('Сохранение...');
    api
      .updateUserAvatar({ avatarUrl })
      .then((res) => {
        const { avatar } = res;
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setAvatarUpdateSubmitButtonState('Сохранить');
      });
  };
  /**
   * cards
   */
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  /**
   * new card adding
   */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [addCardSubmitButtonText, setAddCardSubmitButtonText] = useState('Сохранить');

  const openAddPlaceModal = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleAddPlace = (data) => {
    setAddCardSubmitButtonText('Сохранение...');
    api
      .createCard({
        name: data.name,
        link: data.link,
      })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setAddCardSubmitButtonText('Сохранить');
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.find((item) => item === currentUser.id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };
  /**
   * signup / login functionality
   */
  const history = useHistory();
  const handleLogin = (email, password) => {
    auth
      .signin(email, password)
      .then((res) => {
        const { name, email, about, avatar, id } = res;
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setCurrentUser({
            name,
            email,
            about,
            avatar,
            id,
          });
          tokenCheck();
        }
      })
      .catch((err) => console.error(err));
  };

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupResult, setSignupResult] = useState(false);
  const [resultText, setResultText] = useState('');

  const closeSignupModal = () => {
    if (signupResult) {
      setIsSignupModalOpen(false);
      setResultText('');
      history.push('/signin');
    } else {
      setIsSignupModalOpen(false);
      setResultText('');
    }
  };

  const handleSignup = (email, password) => {
    auth
      .signup(email, password)
      .then(() => {
        setSignupResult(true);
        setResultText('Вы успешно зарегистрировались!');
        setIsSignupModalOpen(true);
      })
      .catch((err) => {
        setResultText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsSignupModalOpen(true);
        console.error(err);
      });
  };
  /**
   * checking jwt token when reloading page
   */
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getCurrentUserInfo(jwt)
        .then((user) => {
          if (user) {
            const { name, email, about, avatar, _id } = user;
            setCurrentUser({
              name,
              email,
              about,
              avatar,
              id: _id,
            });
            setLoggedIn(true);
            history.push('/feed');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser({
      name: '',
      email: '',
      about: '',
      avatar: '',
      id: '',
    });
    setLoggedIn(false);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleModalCloseByEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleModalCloseByEsc);

    return () => {
      document.removeEventListener('keydown', handleModalCloseByEsc);
    }
  }, []);

  const renderCards = (jwt) => api.getCards(jwt).then((cards) => setCards(cards.reverse()));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path='/signin'>
          <Login handleLogin={handleLogin} />
        </Route>

        <Route exact path='/signup'>
          <Register
            handleSignup={handleSignup}
            signupResult={signupResult}
            isSignupModalOpen={isSignupModalOpen}
            onClose={closeSignupModal}
            resultText={resultText}
          />
        </Route>

        <ProtectedRoute
          path='/feed'
          component={Main}
          loggedIn={loggedIn}
          currentUser={currentUser}
          onEditProfile={openEditProfileModal}
          onAddPlace={openAddPlaceModal}
          onEditAvatar={openEditAvatarModal}
          onCardClick={handleCardClick}
          cards={cards}
          renderCards={renderCards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleSignOut={handleSignOut}
        />

        <Route exact path='/'>
          {loggedIn ? <Redirect to='/feed' /> : <Redirect to='/signin' />}
        </Route>

        <Route path='/*'>{loggedIn ? <Redirect to='/feed' /> : <Redirect to='/signin' />}</Route>
      </Switch>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        submitButtonText={editSubmitButtonText}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        currentUser={currentUser}
        onAddPlace={handleAddPlace}
        submitButtonText={addCardSubmitButtonText}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        currentUser={currentUser}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonState={avatarUpdateSubmitButtonState}
      />
      <ImagePopup
        name='pic-modal'
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
