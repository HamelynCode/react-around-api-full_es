import logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      { props.noLogo ? "" : <img className="header__logo" src={logo} alt="Logo de Arround the U.S." />}
      <div className='header__navBar'>
        <p className='session-form__link'>{props.userEmail}</p>
        <Link to={props.linkTo} className='session-form__link' onClick={props.handleClick}>{props.btnText}</Link>
      </div>
    </header>
  );
}
