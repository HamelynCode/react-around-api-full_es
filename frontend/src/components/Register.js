import React from "react";
import SessionForm from "./SessionForm";

export default function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
  }, []);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password, email);
  }

  return (
    <SessionForm
      id="form-edit"
      title="Sign up"
      isOpen={true}
      onClose={()=>{console.log("close")}}
      onSubmit={handleSubmit}
      submitText="Sign up"
      suggestion="Already a member? Log in here!"
      suggestionAction="/signin"
    >
      <div className="form__input-container">
        <input
          name="email"
          type="email"
          className="input input_type_dark"
          id="edit-input-name"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleChangeEmail}
        />
        <span className="form__error" id="edit-input-name-error"></span>
      </div>

      <div className="form__input-container">
        <input
          name="password"
          type="password"
          className="input form__text input_type_dark"
          id="edit-input-text"
          placeholder="Password"
          required
          minLength="2"
          maxLength="200"
          value={password}
          onChange={handleChangePassword}
        />
        <span className="form__error" id="edit-input-text-error"></span>
      </div>
    </SessionForm>
  );
}