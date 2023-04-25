import Infobox from './Infobox';
import { depunctuate } from '../services/helpers';
import { collect, get, lexica } from '../services/dictionaries.js'
import { useState } from 'react';

export default function Word(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const [position, setPosition] = useState(null);
  const [readerPosition, setReaderPosition] = useState(null);
  const [clickThroughHistory, setClickThroughHistory] = useState([]);
  const isActive = props.active;
  const mostRecent = clickThroughHistory.length ? clickThroughHistory[clickThroughHistory.length - 1] : null;

  async function handleClick(e) {
    if (isActive) return;
    const rect = e.target.getBoundingClientRect();
    const rects = e.target.getClientRects();
    setPosition(rects.length > 1 ? rects[0] : rect);
    setReaderPosition(e.target.parentNode.getBoundingClientRect());
    const term = depunctuate(props.word).toLowerCase();
    if (!clickThroughHistory.length) {
      const responses = {
        'quarry': term,
        'wordId': props.wordId,
        'dictionaries': await collect(term),
      };
      setClickThroughHistory([...clickThroughHistory.slice(), responses]);
    }
    console.log({[props.wordId]: props.word})
    setLookupHistory([
      ...lookupHistory.slice(),
      props.wordId
    ]);
    console.log(lookupHistory)
    console.log(lookupHistory.length)
    console.log(Object.keys(lookupHistory))
    console.log(props.wordId)
  }

  const infobox = isActive ?
    <Infobox
      lookupHistory={[lookupHistory, setLookupHistory]}
      clickThroughHistory={[clickThroughHistory, clickThroughHistory]}
      mostRecent={mostRecent}
      word={props.word}
      position={position}
      readerPosition={readerPosition}
    />
    : ''
  ;  
  return (
    <span
      id={props.wordId}
      className={`word-span ${isActive ? 'highlighted' : ''}`}
      onClick={(e) => handleClick(e)}
    >
      {props.word}{infobox}
    </span>
  )
}