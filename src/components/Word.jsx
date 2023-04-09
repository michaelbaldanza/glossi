import Infobox from './Infobox';
import { depunctuate } from '../services/helpers';
import { get, lexica } from '../services/dictionaries.js'
import { useState } from 'react';

export default function Word(props) {
  const [position, setPosition] = useState(null);
  const [readerPosition, setReaderPosition] = useState(null);

  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const numLookups = lookupHistory.length;
  const mostRecent = numLookups ? lookupHistory[numLookups - 1] : null;
  const isSelected = mostRecent?.wordId === props.wordId ? true : false;

  async function handleClick(e) {
    console.log(e._reactName);
    const eName = e._reactName;
    if (eName === 'onClick') {
      alert(`${eName} event!`)
    }
    setPosition(e.target.getBoundingClientRect());
    setReaderPosition(e.target.parentNode.getBoundingClientRect());
    const lookup = depunctuate(props.word).toLowerCase();
    const termres = await get(lexica.wikt.args(lookup));
    const resObj = termres.title && termres.detail ? {
      error: true,
      title: termres.title,
      detail: termres.detail,
    }
    :
      termres
    ;
    const wikt = {
      ...lexica.wikt,
      'response': resObj,
    };
    const responses = {
      'term': lookup,
      'wordId': props.wordId,
      'wikt': wikt,
    };
    setLookupHistory([...lookupHistory.slice(), responses]);
  }

  const infobox = mostRecent?.wordId === props.wordId  ?
    <Infobox
      lookupHistory={[lookupHistory, setLookupHistory]}
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
      className={`word-span ${isSelected ? 'highlighted' : ''}`}
      onClick={(e) => handleClick(e)}
      onTouchStart={(e) => handleClick(e)}
    >
      {props.word}{infobox}
    </span>
  )
}