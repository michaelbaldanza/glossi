import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { BYLINE_ITEM } from '../services/constants';
import { get as getUser } from '../services/users';

export default function BylineBar(props) {
  const [isHovered, setIsHovered] = useState(false);
  const user = getUser();
  const saved = false;
  const createdBy = props.createdBy;
  const languageCode = props.languageCode;
  const link = props.link;
  const title = props.title;
  const updatedAt = props.updatedAt;
  
  function makeButtons() {
    if (!user || user._id && user._id !== createdBy._id) return;
    function makeButton(action, fn) {
      const icons = {
        'delete': isHovered === 'delete' ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-trash-fill ${BYLINE_ITEM}`} viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-trash ${BYLINE_ITEM}`} viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>,
        'edit' : isHovered === 'edit' ?
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pencil-fill ${BYLINE_ITEM}`} viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pencil ${BYLINE_ITEM}`} viewBox="0 0 16 16">
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

      function handleHover(e) {
        e.stopPropagation();
        setIsHovered(action)
      }

      return (
        <button
          className={`btn btn-link link-secondary text-decoration-none toolbar-btn ${BYLINE_ITEM} ${action}`}
          onMouseEnter={(e) => handleHover(e)}
          onMouseLeave={() => setIsHovered(null)}
        >
          {icons[action]}
        </button>
      );
    }
    return (
      <>
        {' '}
        {
          languageCode ?
          ''
          :
          <Link
            to={link + '/edit'}
            title={`Edit ${title}`}
          >
            {makeButton('edit')}
          </Link>
        }
        <Form
          method="delete"
          action={link + '/delete'}
          onSubmit={(event) => {
            if (!window.confirm(
              'Are you sure you want to delete ' + title + '?'
            )) {
              console.log(`deleting at ${link}`)
              event.preventDefault();
            }
          }}
          title={`Delete ${title}`}
          style={{'display': 'inline',}}
        >
          {makeButton('delete')}
        </Form>
      </>
    );
  }

  return (
    <h6 className="toolbar" style={{'cursor': 'auto'}}>
      <Link className={`link-secondary text-decoration-none toolbar-btn ${BYLINE_ITEM}`} to={`/users/${createdBy.username}`}>
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