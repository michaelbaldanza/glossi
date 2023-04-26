import { depunctuate } from '../../services/helpers';
import { collect, get, lexica } from '../../services/dictionaries.js'
import { useState } from 'react';

export default function BoxWord(props) {
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const term = depunctuate(props.word).toLowerCase();

  async function handleClick(e) {
    const boxposition = e.target.getBoundingClientRect();
    const response = {
      'quarry': term,
      'wordId': props.wordId,
      'dictionaries': await collect(term),
    };
    setClickThroughHistory([...clickThroughHistory.slice(), response]);
    props.handleRef();
  }

  return (
    <span
      className="word-span"
      onClick={(e) => handleClick(e)}
    >
      {props.word}
    </span>
  )
}