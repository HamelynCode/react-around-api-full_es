export default function InfoTooltip(props) {
  const popupClass = `view popup ${props.isOpen ? '':'popup_hidden'}`;

  return (
    <div className={popupClass}>
      <div className="infoTooltip">
        <button
          className="btn btn_close view__btn-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="view__image"
          src={props.iconUrl}
          alt="Icono informativo"
        />
        <p className="infoTooltip__text">{props.msg}</p>
      </div>
    </div>
  );
}