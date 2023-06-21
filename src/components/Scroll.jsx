import { Fragment, useState } from 'react';
import Header from './Header';
import Word from './Word';
import { breakLines } from '../services/helpers';

export default function Scroll(props) {
  const [lookupHistory, setLookupHistory] = useState([]);
  const scrollId = props.scroll._id;
  const link = props.link;
  console.log(link)
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
      <Header
        title={props.scroll.title}
        link={'/scrolls/' + props.scroll._id}
        createdBy={props.scroll.createdBy}
        updatedAt={props.scroll.updatedAt}
      />
      <div id="reader-body">
        {makeWords()}
      </div>
    </>
  )
}