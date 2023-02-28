export default function PopupWithForm({id, title, isOpen, onClose, onSubmit, containerClass, submitText, children}) {
  const containerFinalClass = `form__body ${containerClass}`;
  const fromClass = `form popup ${isOpen ? '':'popup_hidden'}`;
  return (
    <form className={fromClass} id={id} onSubmit={onSubmit}>
      <div className={containerFinalClass}>
        <button className="btn btn_close form__btn-close" type="button" onClick={onClose}></button>
        <h2 className="form__title">{title}</h2>

        {children}

        <button type="submit" className="btn btn_submit form__btn-submit">
          {submitText}
        </button>
      </div>
    </form>
  );
}
