import { Fragment, useState } from 'react';
import ScrollToolbar from './ScrollToolbar';
import Word from './Word';
import { breakLines } from '../services/helpers';

export default function Scroll(props) {
  const [lookupHistory, setLookupHistory] = useState([]);
  const scrollId = props.scroll._id;
  function makeWords() {
    if (!props.scroll.body) return;
    const lines = breakLines(props.scroll.body);
    const words = lines.map((line, idx0) => (
      <div className="line" key={'line-' + idx0}>
        {
          line.split(' ').map((word, idx1) => {
            const wordId = (idx0 + 1) + '.' + (idx1 + 1);
            return (
              <Fragment key={wordId}>
                <Word
                  scrollId={scrollId}
                  lookupHistory={[lookupHistory, setLookupHistory]}
                  wordId={wordId}
                  word={word}
                  active={wordId === lookupHistory[lookupHistory.length - 1] ? true : false }
                />
                {' '}
              </Fragment>
            )
          })
        }
      </div>
    ));
    return words;
  }
  
  return (
    <>
      <div id="reader-header" key="heresakey">
        <h3>{props.scroll.title ? props.scroll.title : 'untitled'}</h3>
        <ScrollToolbar scroll={props.scroll} />
      </div>
      <div id="reader-body">
        {makeWords()}
      </div>
    </>
  )
}