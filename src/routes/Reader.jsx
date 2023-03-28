import { useState } from 'react';
import { breakLines, clipTags } from '../services/helpers';
import ReaderForm from '../components/ReaderForm';
import Word from '../components/Word';
import Hexapla from '../components/Hexapla';

export default function Reader() {
  const [submission, setSubmission] = useState({title: '', body: ''})
  const [lookupHistory, setLookupHistory] = useState([]);
  const numLookups = lookupHistory.length;
  const mostRecent = numLookups ? lookupHistory[numLookups - 1] : null;
  console.log(`here's the lookup histroy`)
  console.log(lookupHistory)
  console.log(`here's the most recent lookup`)
  console.log(mostRecent)
  const lines = breakLines(submission.body);
  const words = lines.map((line, idx0) => (
    <div className="line" key={'line-' + idx0}>
      {
        line.split(' ').map((word, idx1) => (
          <>
            <Word
              key={'line-' + idx0 + '-word-' + idx1}   
              word={word}
              lookupHistory={[lookupHistory, setLookupHistory]}
            />
            {' '}
          </>
        ))
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
        {
          mostRecent ?
          <div id="dictionary-container" className={``}>
          <Hexapla mostRecent={mostRecent} lookupHistory={[lookupHistory, setLookupHistory]}/>
        </div>
        : ''
        }
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