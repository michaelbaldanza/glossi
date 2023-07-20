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
            // options: 
            // #1. split words in `line` on space into array.
            // delivers components that return unssuccessful look ups,
            // e.g. genitive/dative
            // component word: genitive/dative
            // look up (after depunctuate): genitivedative
            // #2. regex line so that words, punctuation and spaces are all mapped out.
            // if the mapped out 'word' (string) is a space or in a punctuation
            // dictionary, then return the string, else return the word
            // const regex = /(\w+|\s)/g;
            // const regex = /[\w']+|[^\s\w']/g;            
            const wordId = (idx0 + 1) + '.' + (idx1 + 1);
            return (
              escape(word) ? word :
              <WordWrapper
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
        props.scroll._id ?
        <Header
          title={props.scroll.title}
          link={'/scrolls/' + props.scroll._id}
          createdBy={props.scroll.createdBy}
          updatedAt={props.scroll.updatedAt}
        />
        :
        ''
      }
      <div id="reader-body">
        {makeWords()}
      </div>
    </>
  )
}