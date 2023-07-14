import './App.scss';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav/Nav';
import { get as getUser } from './services/users';
import { BYLINE_ITEM } from './services/constants';

function App() {
  const [user, setUser] = useState(getUser());

  function makeFooter() {
    const icons = {
    //   gh: <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
    //   <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    // </svg>,
      gh: <img src="github.svg" title="GitHub repository"></img>,
      li: <img src="linkedin.svg" title="LinkedIn"></img>,
      mw: <img src="mw120x120.png" width="50" height="50" title="Merriam-Webster's Collegiate Dictionary with Audio API"></img>,
      wiki: <img src="wikimedia.svg" title="Wikimedia REST API"></img>,
    }
    return (
      <footer className="container-fluid">
        <div>
        About
        <div>
          <a
            // className={`link-dark text-decoration-none toolbar-btn ${BYLINE_ITEM}`}
            className="link-dark"
            href="https://github.com/michaelbaldanza/glossi"
          >
            {icons.gh}
          </a>
          <a
            // className={`link-dark text-decoration-none toolbar-btn ${BYLINE_ITEM}`}
            className="link-dark"
            href="https://www.linkedin.com/in/michael-baldanza/"
          >
            {icons.li}
          </a>
        </div>
        </div>
        <div>
          APIs
          <div>
            <a
              href="https://dictionaryapi.com/products/api-collegiate-dictionary"
            >
              {icons.mw}
            </a>
            <a href="https://en.wiktionary.org/api/rest_v1/#/">
              {icons.wiki}
            </a>
          </div>
        </div>
      </footer>
    )
  }

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
      <Footer />
    </div>
  );
}

export default App;
