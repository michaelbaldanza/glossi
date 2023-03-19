import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  const logged = props.user ?
    <div className="container-fluid">
      <Link className="navbar-brand" to={`/`}>Glossi</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/decks'}>
              Decks
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/entries'}>
              Reader
            </Link>
          </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/profile`}>View profile</Link>
                </li>
                <li><div className="dropdown-divider"></div></li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/logout`}
                    onClick={props.handleLogout}
                  >
                    Log out
                  </Link>
                </li>
              </ul>
            </li>
        </ul>
      </div>
    </div>
    :
    <div className="container-fluid">
      <Link className="navbar-brand" to={`/`}>Glossi</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/decks'}>
              Decks
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/entries'}>
              Reader
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/login`}>
              Log in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/signup`}>
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>;

  return (
    <nav className="navbar navbar-expand-sm">
      {logged}
    </nav>
  )
}