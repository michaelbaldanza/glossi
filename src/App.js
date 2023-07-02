import './App.scss';
import React, { useState } from 'react';
import { Form, Link, Outlet, useNavigate } from 'react-router-dom';
import { get as getUser, logout } from './services/users';
import { capitalize, clipTags } from './services/helpers';

function App() {
  const [lookupHistory, setLookupHistory] = useState([]);
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    logout();
    setUser(null);
    navigate('/');
  }

  function makeNav() {
    function makeNavItem(text, url) {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            to={'/' + (url ? url : text)}
          >
            {capitalize(text)}
          </Link>
        </li>
      );
    }

    function makeDropdownBtn(text) {
      return (
        <button className="btn btn-link text-decoration-none dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {text}
        </button>
      )
    }

    function makeDropdownItem(text, url) {
      return (
        <li>
          <Link
            className="dropdown-item dropdown-link"
            to={'/' + (url ? url : text)}
          >
            {text}
          </Link>
        </li>
      );
    }

    return (
      <nav className="nav navbar navbar-expand-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>Glossi</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {makeNavItem('reader')}
              {makeNavItem('decks')}
              {
                user ?
                <div className="dropdown">
                  {makeDropdownBtn('Scrolls')}
                  <ul className="dropdown-menu">
                    {makeDropdownItem('All scrolls', 'scrolls')}
                    {makeDropdownItem('Add scroll', 'scrolls/new')}
                  </ul>
                </div>
                :
                makeNavItem('scrolls')
              }
              {
                user ?
                  <div className="dropdown">
                    {makeDropdownBtn(user.username)}
                    <ul className="dropdown-menu">
                      {makeDropdownItem('View profile', `users/${user.username}`)}
                      <li>
                        <Form
                          action={`logout`}
                          method="post"
                          onSubmit={handleLogout}
                        >
                          <button className="btn btn-link dropdown-item dropdown-link" height="40" type="submit">Log out</button>
                        </Form>
                      </li>
                    </ul>
                  </div>
                :
                <>
                  {makeNavItem('login')}
                  {makeNavItem('sign up', 'signup')}
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <div className="App">
      <div id="nonfooter" className="">
        {makeNav()}
        <main className="container-fluid main-el">
          <div className="outer-container">
            <Outlet context={[user, setUser]} />
          </div>
        </main>
      </div>
      <footer className="container-fluid">
        Definitions from <a className="text-decoration-none" href="https://en.wiktionary.org/wiki/Wiktionary:Main_Page">Wiktionary</a>, provided by <a className="text-decoration-none" href="https://en.wiktionary.org/api/rest_v1/">the Wikimedia REST API</a>.
      </footer>
    </div>
  );
}

export default App;
