import { Link } from "react-router-dom";

export default function SessionForm({id, title, isOpen, onClose, onSubmit, containerClass, submitText, suggestion, suggestionAction, children}) {
    return (
      <form className="form" id={id} onSubmit={onSubmit}>
        <div className="session-form">
          <button className="btn btn_close form__btn-close" type="button" onClick={onClose}></button>
          <h2 className="session-form__title">{title}</h2>
  
          {children}
  
          <button type="submit" className="btn btn_submit session-form__btn-submit">
            {submitText}
          </button>
          <Link className="session-form__link" to={suggestionAction}>{suggestion}</Link>
        </div>
      </form>
    );
  }