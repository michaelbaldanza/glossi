import { Fragment, useState } from 'react';
import ScrollToolbar from './ScrollToolbar';
import Word from './Word';
import { breakLines } from '../services/helpers';

export default function Scroll(props) {
  const [lookupHistory, setLookupHistory] = useState([]);
  const decks = props.scroll.decks;
  const lines = breakLines(props.scroll.body);
  const words = lines.map((line, idx0) => (
    <div className="line" key={'line-' + idx0}>
      {
        line.split(' ').map((word, idx1) => {
          const wordId = 'line-' + idx0 + '-word-' + idx1;
          return (
            <Fragment key={wordId}>
              <Word
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

  return (
    <>
      <div id="reader-header" key="heresakey">
        <h3>{props.scroll.title ? props.scroll.title : 'untitled'}</h3>
        <ScrollToolbar scroll={props.scroll} />
      </div>
      <div id="reader-body">
        {words}
      </div>
    </>
  )
}