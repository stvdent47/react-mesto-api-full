import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import logo from '../images/logo.svg';

const Header = (props) => {
  const currentUser = useContext(CurrentUserContext);
  let headerLink;

  if (props.page === 'signin') {
    headerLink = <Link to='/signup' className='header__link'>Регистрация</Link>
  } else if (props.page === 'signup') {
    headerLink = <Link to='/signin' className='header__link'>Войти</Link>
  } else if (props.page === 'feed') {
    headerLink = 
    <nav className='header__nav'>
      <p className="header__info">{currentUser.email}</p>
      <Link to='/login' className='header__link header__link_signout' onClick={props.handleSignOut}>Выйти</Link>
    </nav>
  }

  return (
    <header className='header'>
      <img src={logo} alt='логотип место' className='header__logo' />
      {headerLink}
    </header>
  );
};

export default Header;
