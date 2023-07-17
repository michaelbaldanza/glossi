import './App.scss';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
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
      <Footer />
    </div>
  );
}

export default App;
