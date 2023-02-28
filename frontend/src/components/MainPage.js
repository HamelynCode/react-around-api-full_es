import { useState } from 'react';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function MainPage(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }
  function handleCardClick(card){
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function onUpdateAvatar(data) {
    props.handleUpdateAvatar(data);
    closeAllPopups();
  }
  function onUpdateUser(user) {
    props.handleUpdateUser(user);
    closeAllPopups();
  }
  function onAddPlace(place) {
    props.handleAddPlaceSubmit(place);
    closeAllPopups();
  }

  return (
    <>
      <ImagePopup
        selectedCard={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        id="form-delete"
        title="Estas seguro/a ?"
        isOpen={false}
        onClose={closeAllPopups}
        containerClass="form__body_confirm"
        submitText="Sí"
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={onUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={onAddPlace}
      />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={props.cards}
        onCardLike={props.handleCardLike}
        onCardDelete={props.handleCardDelete}
      />
      <Footer />
    </>
  );
}
