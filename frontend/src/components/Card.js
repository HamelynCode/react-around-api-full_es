import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props){
  const currentUser = useContext(CurrentUserContext);
  const card = props.card;

  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return(
    <div className="card">
      <button className={`btn btn_delete ${isOwn ? '' :'btn_delete_hidden'}`} onClick={handleDeleteClick}></button>
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__description">
        <p className="card__text">{card.name}</p>
        <div>
          <button className={`btn btn_like ${isLiked ? 'btn_like_active': '' }`} onClick={handleLikeClick}></button>
          <p className="card__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
