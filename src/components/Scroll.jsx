import { useState } from 'react';
import Word from './Word';
import { breakLines } from '../services/helpers';

export default function Scroll(props) {
  const [lookupHistory, setLookupHistory] = useState([]);
  const numLookups = lookupHistory.length;
  const mostRecent = numLookups ? lookupHistory[numLookups - 1] : null;
  const lines = breakLines(props.scroll.body);
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

  return (
    <>
      <div id="reader-header">
        <h1>{props.scroll.title ? props.scroll.title : 'untitled'}</h1>
      </div>
      <div id="reader-body">
        {words}
      </div>
    </>
  )
}