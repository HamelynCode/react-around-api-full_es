export default function ImagePopup(props) {
  const popupClass = `view popup ${props.isOpen? '':'popup_hidden'}`;

  return (
    <div className={popupClass}>
      <div className="view__frame">
        <button
          className="btn btn_close view__btn-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="view__image"
          src={props.selectedCard.link}
          alt="imagen seleccionada"
        />
        <p className="view__title">{props.selectedCard.name}</p>
      </div>
    </div>
  );
}
