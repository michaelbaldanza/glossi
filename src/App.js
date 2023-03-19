import './App.css';
import React, { useState } from 'react';
import { Link, Outlet, redirect } from 'react-router-dom';
import { lexica } from './services/dictionaries';
import { getUser, logout } from './services/users';
import { capitalize, clipTags } from './services/helpers';
import Form from './components/Form.js';
import Nav from './components/Nav.jsx';

function App() {
  const [lookupHistory, setLookupHistory] = useState([]);
  const [user, setUser] = useState(getUser());
  const mostRecent = lookupHistory[lookupHistory.length - 1];
  console.log(`here's the most recent lookup`)
  console.log(mostRecent);
  console.log(`here's the user ${user}`);

  function handleLogout() {
    logout();
    setUser(null);
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


  return (
    <div className="App">
      <div id="nonfooter" className="">
        <Nav user={user} handleLogout={handleLogout} />
        <div className="container-fluid">
          <Form addLookup={addLookup} />
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
