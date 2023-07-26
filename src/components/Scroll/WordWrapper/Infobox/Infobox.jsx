import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Body from './Body/Body';
import Nav from './Nav';
import Header from './Header';

export default function Infobox(props) {
  const decks = props.decks;
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const quarry = props.mostRecent.quarry;
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const dictionaries = props.mostRecent.dictionaries;
  const [selLang, setSelLang] = useState(
    dictionaries.wikt && !dictionaries.wikt.response.title ?
    (dictionaries.wikt.response.en ? 'en' : Object.keys(dictionaries.wikt.response)[0])
    :
    null
  );
  const [activeDict, setActiveDict] = useState(isMobile ? 'Free Dictionary' : 'Wiktionary');
  const [addView, setAddView] = useState([]);
  const infoboxRef = useRef(null);
  const dictProps = {
    decks: decks,
    quarry: quarry,
    currentIdx: [currentIdx, setCurrentIdx],
    clickThroughHistory: [clickThroughHistory, setClickThroughHistory],
    selLang: [selLang, setSelLang],
    addView: [addView, setAddView],
    handleRef: handleRef,
  };
  function handleRef() {
    infoboxRef.current.scrollTop = 0;
  }

  function getInfoboxPosition() {
    /** The variables for calculating where the Infobox should render.
     * All values are in pixels.
     * x stores the distance of the left side of WordWrapper from the left side of the viewport.
     * y and bottom do the same, but
     * from the top and bottom of WordWrapper, respectively, to the top of the
     * viewport. rRight stores the distance of the right side of the reader from
     * the left side of the viewport.
    */
    const [x, y, bottom, rRight] = [
      props?.position.x,
      props?.position.y,
      props?.position.bottom,
      props?.readerPosition.right
    ];
    /** Calculating where the Infobox should render.
     * If the width of the window is greater than 767px, then the infobox renders 
     * as many pixels away from the top of the screen as the distance of the
     * bottom of the word to the top of the viewport minus the distance of the
     * top of the word from the top of the viewport plus 12px, and as many
     * pixels away from the left side of the screen as the right side of the
     * reader is from the left side of the screen. Otherwise the Infobox renders
     * at the top of the screen is the clicked word is closer to the bottom or
     * at the bottom of the screen if it is closer to the top.
     */
    const position = window.innerWidth > 767 ?
      {top: -((200 / 2) - ((bottom - y) / 2)), left: rRight - x}
      :
      y > window.innerHeight / 2 ? {top: 0} : {bottom: 0}
    ;
    return position;
  }

  return (
    <div
      className={`infobox`}
      ref={infoboxRef}
      style={{...getInfoboxPosition(), 'cursor': 'auto'}}
    >
      <Header
        addView={[addView, setAddView]}
        clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
        currentIdx={[currentIdx, setCurrentIdx]}
        lookupHistory={[lookupHistory, setLookupHistory]}
        quarry={[quarry]}
      />
      <Nav
        activeDict={[activeDict, setActiveDict]}
        addView={[addView, setAddView]}
        dictionaries={dictionaries}
      />
      {/* {makeInfoboxBody()} */}
      <Body
        activeDict={activeDict}
        addView={[addView, setAddView]}
        decks={decks}
        dictionaries={dictionaries}
        dictProps={dictProps}
        scrollId={props.scrollId}
        wordId={props.wordId}
      />
    </div>
  );
}