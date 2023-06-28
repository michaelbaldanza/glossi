import React, { useState } from 'react';
import { Form, Link, Outlet, useNavigate } from 'react-router-dom';
import { get as getUser, logout } from './services/users';
import { clipTags } from './services/helpers';

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
  const logged = <div className="container-fluid">
      <Link className="navbar-brand" to={`/`}>Glossi</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link className="nav-link" to={'/scrolls'}>
              Scrolls
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/decks'}>
              Decks
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/reader'}>
              Reader
            </Link>
          </li>
          {
            user ?
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/users/${user.username}`}>{user.username}</Link>
              </li>
              <li className="nav-item">
                <Form
                  action={`logout`}
                  method="post"
                  onSubmit={handleLogout}
                >
                  <button className="btn btn-link nav-link nav-btn" height="40" type="submit">Log out</button>
                </Form>
              </li>
            </> :
            <>
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
            </>
          }
        </ul>
      </div>
    </div>

  return (
    <div className="App">
      <div id="nonfooter" className="">
        <nav className="navbar navbar-expand-sm">
          {logged}
        </nav>
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
