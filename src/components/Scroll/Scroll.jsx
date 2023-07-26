import { Fragment, useState } from 'react';
import Header from '../Header';
import Word from './WordWrapper/Word';
import WordWrapper from './WordWrapper/WordWrapper';
import { breakLines, escape } from '../../services/helpers';

export default function Scroll(props) {
  const [lookupHistory, setLookupHistory] = useState([]);
  const scrollId = props.scroll._id;
  function makeWords() {
    if (!props.scroll.body) return;
    const lines = breakLines(props.scroll.body);
    const words = lines.map((line, idx0) => (
      <div className="line" key={'line-' + idx0}>
        {
          line.split(/(\s|\/)/g).map((word, idx1) => {     
            const wordId = (idx0 + 1) + '.' + (idx1 + 1);
            return (
              escape(word) ? word :
              <WordWrapper
                key={wordId}
                scrollId={scrollId}
                lookupHistory={[lookupHistory, setLookupHistory]}
                wordId={wordId}
                word={word}
                active={wordId === lookupHistory[lookupHistory.length - 1] ? true : false }
              />
            )
          })
        }
      </div>
    ));
    return words;
  }
  
  return (
    <>
      {
        // props.scroll._id ?
        <Header
          title={props.scroll.title}
          link={'/scrolls/' + props.scroll._id}
          createdBy={props.scroll.createdBy}
          updatedAt={props.scroll.updatedAt}
        />
        // :
        // ''
      }
      <div id="reader-body">
        {makeWords()}
      </div>
    </>
  )
}