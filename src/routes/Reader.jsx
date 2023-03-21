import { useState } from 'react';
import { breakLines } from '../services/helpers';
import ReaderForm from '../components/ReaderForm';
import Word from '../components/Word';

export default function Reader() {
  const [submission, setSubmission] = useState({title: '', body: ''})
  const lines = breakLines(submission.body);
  const words = lines.map((line, idx0) => (
    <div key={'line-' + idx0}>
      {
        line.split(' ').map((word, idx1) => (
          <span key={'line-' + idx0 + '-word-' + idx1}>
            <Word word={word} />{' '}
          </span>
        ))
      }
    </div>
  ));
  
  const dictionary = <div id="dictionary-container"></div>

  const reader = submission.body.length
    ?
    <div id="reader-body" className="scroll">
      {
        words
      }
    </div>
    :
    <ReaderForm submission={[submission, setSubmission]} />
  ;
  return (
    <>
      <h1>
        
      </h1>
      <div id="reader-container">
        {reader}
        {dictionary}
      </div>
      
    </>
  );
};