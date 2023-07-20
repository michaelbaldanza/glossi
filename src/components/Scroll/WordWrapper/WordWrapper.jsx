import Infobox from './Infobox/Infobox';
import Word from './Word';
import { useState } from 'react';

export default function WordWrapper(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const [position, setPosition] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [readerPosition, setReaderPosition] = useState(null);
  const [clickThroughHistory, setClickThroughHistory] = useState([]);
  const isActive = props.active;
  const mostRecent = clickThroughHistory[currentIdx];

  async function handleWrapperClick(target) {
    if (isActive) return;
    const rect = target.getBoundingClientRect();
    const rects = target.getClientRects();
    setPosition(rects.length > 1 ? rects[0] : rect);
    setReaderPosition(target.parentNode.getBoundingClientRect());
  }

  function makeInfobox() {
    if (lookupHistory[lookupHistory.length - 1] !== props.wordId) return;

    return <Infobox
      isActive={props.active}
      scrollId={props.scrollId}
      currentIdx={[currentIdx, setCurrentIdx]}
      lookupHistory={[lookupHistory, setLookupHistory]}
      clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
      mostRecent={mostRecent}
      word={props.word}
      wordId={props.wordId}
      position={position}
      readerPosition={readerPosition}
    />;
  }

  return (
    <span
      id={props.wordId + '-wrapper'}
      className={`word-span-wrapper`}
    >
      <Word
        active={props.active}
        clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
        currentIdx={[currentIdx, setCurrentIdx]}
        handleWrapperClick={handleWrapperClick}
        lookupHistory={props.lookupHistory}
        word={props.word}
        wordId={props.wordId}
      />
      {makeInfobox()}
    </span>
  )
}