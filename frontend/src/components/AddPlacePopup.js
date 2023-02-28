import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const nameRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      url: urlRef.current.value
    });
  }

  return (
    <PopupWithForm
      id="form-add"
      title="Crear tarjeta nueva"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Guardar"
    >
      <div className="form__input-container">
        <input
          ref={nameRef}
          name="name"
          type="text"
          className="input form__name"
          id="add-input-name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__error" id="add-input-name-error"></span>
      </div>

      <div className="form__input-container">
        <input
          ref={urlRef}
          name="text"
          type="url"
          className="input form__text"
          id="add-input-text"
          placeholder="Link"
          required
        />
        <span className="form__error" id="add-input-text-error"></span>
      </div>
    </PopupWithForm>
  );
}
