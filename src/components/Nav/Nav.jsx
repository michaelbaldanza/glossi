import { Form, Link, useNavigate } from 'react-router-dom';
import DropBtn from './NavItems/DropBtn';
import Item from './NavItems/Item';
import { logout } from '../../services/users';

export default function Nav(props) {
  const [user, setUser] = props.user;
  const navigate = useNavigate();
  // try togglerIcon with 1.5emx1.5em dims
  const togglerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>;

  function makeScrollUI() {
    return (
      <>
        {
          user ?
          <div className="dropdown">
            <DropBtn text={'scrolls'} />
            <ul className="dropdown-menu">
              <Item
                text={'All scrolls'}
                url={'scrolls'}
                isDropItem={true}
              />
              <Item
                text={'Add scroll'}
                url={'scrolls/new'}
                isDropItem={true}
              />
            </ul>
          </div>
          :
          <Item text={'scrolls'} />
        }
      </>
    );
  }

  function makeAccountUI() {
    function handleLogout(e) {
      e.preventDefault();
      logout();
      setUser(null);
      navigate('/');
    }

    return (
      <>
        {
          user ?
          <div className="dropdown">
            <DropBtn text={user.username} />
            <ul className="dropdown-menu">
              <Item
                text={'View profile'}
                url={'users/' + user.username}
                isDropItem={true}
              />
              <li>
                <Form
                  action={'logout'}
                  method={'post'}
                  onSubmit={handleLogout}
                >
                  <button className="btn btn-link dropdown-item dropdown-link" height="40" type="submit">Log out</button>
                </Form>
              </li>
            </ul>
          </div>
          :
          <>
            <Item text={'login'} isDropItem={false} />
            <Item text={'sign up'} url={'signup'} />
          </>
        }
      </>
    )
  }

  return (
    <nav className="nav navbar navbar-expand-sm">
      <div className="container-fluid">
      <Link className="navbar-brand" to={'/'}>Glossi</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        {/* <span className="navbar-toggler-icon"></span> */}
        <span className="custom-toggler-icon">
          {togglerIcon}
        </span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <Item text={'reader'} />
          <Item text={'decks'} />
          {makeScrollUI()}
          {makeAccountUI()}
        </ul>
      </div>
      </div>
    </nav>
  )
}