import './App.css';
import React, { useState } from 'react';
import { Form, Link, Outlet, useNavigate } from 'react-router-dom';
import { lexica } from './services/dictionaries';
import { getUser, logout } from './services/users';
import { capitalize, clipTags } from './services/helpers';

function App() {
  const [lookupHistory, setLookupHistory] = useState([]);
  const [user, setUser] = useState(getUser());
  const mostRecent = lookupHistory[lookupHistory.length - 1];
  const navigate = useNavigate();
  console.log(user);
  function handleLogout(e) {
    e.preventDefault();
    logout();
    setUser(null);
    console.log('in handleLogout right about navigate("/"')
    navigate('/');
  }

  async function addLookup(lookup) {
    const fdRes = await lexica.fd.compose(lookup);
    const wikres = await fetch(`https://en.wiktionary.org/api/rest_v1/page/html/${lookup}`, {
      method: 'GET', headers: {
        'accept': 'text/html; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/HTML/2.1.0"',
        'User-Agent': 'michael.snider.baldanza@gmail.com'
      },})
    // .then((res) => res.json()
    .then((response) => response.text()
    .then((data) => {
      return data;
    }));
    const termres = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${lookup}`, {
      method: 'GET',  
      headers: {
          'accept': 'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/definition/0.8.0"',
          'User-Agent': 'michael.snider.baldanza@gmail.com'
        }
    })
    .then((res) => res.json()
    .then((data) => {
      console.log(data);
      return data;
    }));
    const newLookup = {
      'term': lookup,
      'fd': fdRes,
      'wk': termres,
    };
    // console.log(clipTags(wikres));
    setLookupHistory([...lookupHistory, newLookup]);
  }

  const responses = <div>
    <h1>{mostRecent?.term}</h1>
    {
      mostRecent?.wk.en.map((en, id0) => (
        <div>
          <h5>{en.partOfSpeech}</h5>
          <div>
            <ol>
              {
                en.definitions?.map((def, id1) => (
                  <li>
                    {clipTags(def.definition)}
                    {
                      def.examples ? <ul>
                        {
                          def.examples.map((ex, id2) => (
                            <li>{clipTags(ex)}</li>
                          ))
                        }
                      </ul> : ''
                    }
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      ))
    }
  </div>;

  const logged = <div className="container-fluid">
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
            <Link className="nav-link" to={'/reader'}>
              Reader
            </Link>
          </li>
          {
            user ?
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/profile`}>View profile</Link>
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
        <div className="container-fluid">
          <Outlet context={[user, setUser]} />
        </div>
        <div className="container-fluid">
          {responses}
        </div>
      </div>
      <footer className="container-fluid">
        Definitions from <a className="text-decoration-none" href="https://en.wiktionary.org/wiki/Wiktionary:Main_Page">Wiktionary</a>, provided by <a className="text-decoration-none" href="https://en.wiktionary.org/api/rest_v1/">the Wikimedia REST API</a>.
      </footer>
    </div>
  );
}

export default App;
