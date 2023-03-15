import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { lexica } from './services/dictionaries';
import { capitalize, clipTags } from './services/helpers';
import Form from './components/Form.js';

function App() {
  const [lookupHistory, setLookupHistory] = useState([]);
  const mostRecent = lookupHistory[lookupHistory.length - 1];
  console.log(`here's the most recent lookup`)
  console.log(mostRecent);
  
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


  return (
    <div className="App">
      <div id="nonfooter" className="">
        <nav className="navbar navbar-expand-sm">
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
                      <Link className="dropdown-item" to={`/logout`}>Log out</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/auth/google`}>
                    Login
                  </Link>
                </li>
            </ul>
          </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Form addLookup={addLookup} />
          <Outlet />
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
