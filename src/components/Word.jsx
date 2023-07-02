import Infobox from './Infobox';
import { depunctuate } from '../services/helpers';
import { collect, get, lexica } from '../services/dictionaries.js'
import { useState } from 'react';

export default function Word(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const [position, setPosition] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readerPosition, setReaderPosition] = useState(null);
  const [clickThroughHistory, setClickThroughHistory] = useState([]);
  const isActive = props.active;
  const mostRecent = clickThroughHistory[currentIdx];

  async function handleClick(e) {
    if (isActive) return;
    const rect = e.target.getBoundingClientRect();
    const rects = e.target.getClientRects();
    setPosition(rects.length > 1 ? rects[0] : rect);
    setReaderPosition(e.target.parentNode.getBoundingClientRect());
    const term = depunctuate(props.word);
    if (!clickThroughHistory.length) {
      const response = {
        'quarry': term,
        'wordId': props.wordId,
        'dictionaries': await collect(term),
      };
      console.log(response);
      setClickThroughHistory([...clickThroughHistory.slice(), response]);
    }
    setLookupHistory([
      ...lookupHistory.slice(),
      props.wordId
    ]);
  }

  const infobox = isActive ?
    <Infobox
      scrollId={props.scrollId}
      currentIdx={[currentIdx, setCurrentIdx]}
      lookupHistory={[lookupHistory, setLookupHistory]}
      clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
      mostRecent={mostRecent}
      word={props.word}
      wordId={props.wordId}
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