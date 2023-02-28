import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div onClick={props.onEditAvatarClick}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Imágen de perfil del usuario"
          />
          <div className="profile__edit-cover"></div>
        </div>

        <div className="profile__info">
          <div className="profile__data">
            <h2 className="profile__name">{currentUser.name}</h2>
            <button className="btn btn_edit" onClick={props.onEditProfileClick}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>

        <button className="btn btn_add profile__btn" onClick={props.onAddPlaceClick}></button>
      </section>

      <section className="elements">
        {props.cards.map(card =>(
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          )
        )}
      </section>
    </main>
  );
}
