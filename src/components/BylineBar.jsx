import { Form, Link } from 'react-router-dom';
import { BYLINE_ITEM } from '../services/constants';
import { getUser } from '../services/users';

export default function BylineBar(props) {
  console.log(props)
  const user = getUser();
  const saved = false;
  const createdBy = props.createdBy;
  const title = props.title;
  const updatedAt = props.updatedAt;

  function makeButtons() {
    if (!user || user._id && user._id !== createdBy._id) return;

    const icons = {
      'delete': <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={`bi bi-x ${BYLINE_ITEM}`} viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>,
      'edit' : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pencil ${BYLINE_ITEM}`} viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>,
      'add': <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={`bi bi-plus ${BYLINE_ITEM}`} viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>,
      'save': saved ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-bookmark-fill ${BYLINE_ITEM}`} viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-bookmark ${BYLINE_ITEM}`} viewBox="0 0 16 16">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>,
    };

    function makeButton(icon, fn) {
      return (
        <button
          className={`btn btn-link link-secondary text-decoration-none toolbar-btn ${BYLINE_ITEM}`}
        >
          {icon}
        </button>
      );
    }
    return (
      <>
        &nbsp;
        <Link to={props.link ? props.link + '/edit' : 'edit'} title={`Edit ${title}`}>
          {makeButton(icons.edit)}
        </Link>
        <Form
          method="delete"
          action="delete"
          onSubmit={(event) => {
            if (!window.confirm('Please confirm you want to delete this scroll.')) {
              event.preventDefault();
            }
          }}
          title={`Delete ${title}`}
          style={{'display': 'inline'}}
        >
          {makeButton(icons.delete)}
        </Form>
      </>
    );
  }

  return (
    <h6 className="toolbar" style={{'cursor': 'auto'}}>
      <Link className={`link-dark text-decoration-none faded toolbar-btn ${BYLINE_ITEM}`} to={`/users/${createdBy.username}`}>
        {createdBy.username}
      </Link>
      &nbsp;
      <span className={`toolbar-btn date-span faded ${BYLINE_ITEM}`}>
        {updatedAt.slice(0, 10)}
      </span>
      {makeButtons()}
    </h6>
  );
}