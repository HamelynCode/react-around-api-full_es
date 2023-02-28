import React from "react";
import SessionForm from "./SessionForm";

export default function Login(props) {
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
    props.onLogin(password, email);
  }

  return (
    <>
      <SessionForm
        id="form-edit"
        title="Log in"
        isOpen={true}
        onClose={()=>{console.log("close")}}
        onSubmit={handleSubmit}
        submitText="Log in"
        suggestion="Not a member yet? Sign up here!"
        suggestionAction="/signup"
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
    </>
  );
}