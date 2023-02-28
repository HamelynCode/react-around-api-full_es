import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }

  return (
    <PopupWithForm
      id="form-profile-img"
      title="Cambiar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      containerClass="form__body_avatar"
      submitText="Guardar"
    >
      <div className="form__input-container">
        <input
          ref={urlRef}
          name="text"
          type="url"
          className="input form__text"
          id="profile-img-input-text"
          placeholder="Link"
          required
        />
        <span className="form__error" id="profile-img-input-text-error"></span>
      </div>
    </PopupWithForm>
  );
}
