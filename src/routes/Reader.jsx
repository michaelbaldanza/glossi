import { Fragment, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { breakLines } from '../services/helpers';
import { create } from '../services/scrolls';
import ReaderForm from '../components/ReaderForm';
import Scroll from '../components/Scroll';
import Word from '../components/Word';

export default function Reader() {
  const [user, setUser] = useOutletContext();
  const saved = false;
  const [editMode, setEditMode] = useState(false);
  const [submission, setSubmission] = useState({title: '', body: ''})
  const [lookupHistory, setLookupHistory] = useState([]);
  const numLookups = lookupHistory.length;
  const mostRecent = numLookups ? lookupHistory[numLookups - 1] : null;
  const lines = breakLines(submission.body);
  const words = lines.map((line, idx0) => (
    <div className="line" key={'line-' + idx0}>
      {
        line.split(' ').map((word, idx1) => {
          const wordId = 'line-' + idx0 + '-word-' + idx1;
          return (
            <Fragment key={wordId}>
              <Word
                wordId={wordId}
                word={word}
                lookupHistory={[lookupHistory, setLookupHistory]}
                mostRecent={mostRecent}
              />
              {' '}
            </Fragment>
          )
        })
      }
    </div>
  ));
  
  function handleSave() {
    // if (user) {
      create(submission);
    // }
  }

  function makeReaderToolbar(){
    return <div className="toolbar">
    <button
      className="btn btn-link link-secondary text-decoration-none toolbar-btn"
      onClick={() => setEditMode(!editMode)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </button>
    <button
      className="btn btn-link link-secondary text-decoration-none toolbar-btn"
      onClick={() => handleSave()}
    >
      {bookmark}
    </button>
  </div>;
  }

  const bookmark = saved ?
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
    </svg>
    :
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
    </svg>
  ;

  const reader = editMode
    ?
    <div className="outer-container" id="reader-container">
      <div id="reader-header">
        <h1>
          {
            submission.title ? submission.title : 'untitled'
          }
        </h1>
        {/* {makeReaderToolbar()} */}
      </div>
      <div id="reader-body" className="">
        <Scroll 
          scroll={submission}
        />
      </div>
    </div>
    :
    <div>
      <ReaderForm
        submission={[submission, setSubmission]}
        editMode={[editMode, setEditMode]}
      />
    </div>
  ;
  return (
    <>
      {reader}
    </>
  );
};