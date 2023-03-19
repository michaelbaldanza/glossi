import Nav from '../components/Nav';
import Form from '../components/Form';
import { Outlet } from 'react-router-dom';


export default function Root(props) {
  return (
    <div className="App">
    <div id="nonfooter" className="">
      <Nav user={props.user} handleLogout={props.handleLogout} />
      <div className="container-fluid">
        <Form addLookup={addLookup} />
        <Outlet />
      </div>
      <div className="container-fluid">
        {props.responses ? props.responses : ''}
      </div>
    </div>
    <footer className="container-fluid">
      Definitions from <a className="text-decoration-none" href="https://en.wiktionary.org/wiki/Wiktionary:Main_Page">Wiktionary</a>, provided by <a className="text-decoration-none" href="https://en.wiktionary.org/api/rest_v1/">the Wikimedia REST API</a>.
    </footer>
  </div>
  )
}