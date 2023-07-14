import './App.scss';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { get as getUser } from './services/users';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <div id="nonfooter" className="">
        <Nav user={[user, setUser]}/>
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
