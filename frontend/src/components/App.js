import Header from './Header';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

import registerDone from '../images/register-done-icon.png';
import registerFail from '../images/register-fail-icon.png';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegisteredPopupOpen, setIsRegisteredPopupOpen] = useState(false);
  const [isFailedPopupOpen, setIsFailedPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);

  const history = useHistory();

  useEffect(()=>{
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          showMainPage(res.data.email);
        }
      })
    }
  }, [showMainPage]);

  function showMainPage(userEmail) {
    setLoggedIn(true);
    setEmail(userEmail);
    history.push('/');

    api.getUserInfo()
    .then((info)=>{
      setCurrentUser(info);
      api.getInitialCards()
      .then((cards)=>{
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if(isLiked){
      api.removeLike(card._id).then((newCard)=>{
        setCards(cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.addNewLike(card._id).then((newCard)=>{
        setCards(cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard)=>{
      setCards(cards.filter(c => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about).then((info)=>{
      setCurrentUser(info);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.setProfileImage(data.avatar).then((info)=>{
      setCurrentUser(info);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(place) {
    api.addNewCard(place.name, place.url).then((newCard)=>{
      setCards([newCard, ...cards]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleRegister(password, email) {
    auth.register(password, email).then((res)=>{
      if (res.data) {
        history.push('/signin');
        setIsRegisteredPopupOpen(true);
      } else {
        setIsFailedPopupOpen(true);
      }
    });
  }

  function handleLogin(password, email) {
    auth.authorize(password, email).then((data)=>{
      if(data){
        showMainPage(email);
      }
    });
  }

  function handleSignout() {
    if (localStorage.getItem('jwt')){
      localStorage.removeItem('jwt');
    }
    setLoggedIn(false);
    history.push('/signin');
  }

  function closeInfoTooltip() {
    setIsRegisteredPopupOpen(false);
    setIsFailedPopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <InfoTooltip isOpen={isRegisteredPopupOpen} onClose={closeInfoTooltip} iconUrl={registerDone} msg={'Success! You have now been registered.'} />
        <InfoTooltip isOpen={isFailedPopupOpen} onClose={closeInfoTooltip} iconUrl={registerFail} msg={'Oops, something went wrong! Please try again.'} />
        <Switch>
          <Route path="/signin">
            <Header btnText="Sign up" linkTo="/signup" />
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Header btnText="Sign in" linkTo="/signin" />
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/">
            <Header handleClick={handleSignout} userEmail={email} btnText="Sign out" linkTo="/signin" noLogo={true} />
            <ProtectedRoute loggedIn={loggedIn} component={MainPage} cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} handleUpdateUser={handleUpdateUser} handleUpdateAvatar={handleUpdateAvatar} handleAddPlaceSubmit={handleAddPlaceSubmit} />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);