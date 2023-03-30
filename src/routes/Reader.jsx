import { useState } from 'react';
import { breakLines } from '../services/helpers';
import ReaderForm from '../components/ReaderForm';
import Word from '../components/Word';

export default function Reader() {
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
            <>
              <Word
                key={wordId}
                wordId={wordId}
                word={word}
                lookupHistory={[lookupHistory, setLookupHistory]}
                mostRecent={mostRecent}
              />
              {' '}
            </>
          )
        })
      }
    </div>
  ));

  const reader = submission.body.length
    ?
    <div id="reader-container">
      <div className="scroll">
        <div id="reader-body" className="">
          {
            words
          }
        </div>
      </div>
    </div>
    :
    <div>
      <ReaderForm submission={[submission, setSubmission]} />
    </div>
  ;
  return (
    <>
      {reader}
    </>
  );
};