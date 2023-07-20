import { Fragment, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Dictionary from './Dictionaries/Dictionary';
import CardForm from './Dictionaries/CardForm';
import { isLast } from '../../../../services/helpers';
import { lexica, refOrder } from '../../../../services/dictionaries';
import { BTN_CLASSES } from '../../../../services/constants';

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

  function makeInfoboxHeader() {
    function handleXClick(e) {
      e.stopPropagation();
      if (addView.length) return setAddView(addView.slice(0, 0));
      setLookupHistory([...lookupHistory.slice(), null]);
    }

    function canClick(val) {
      const canClick = (
        (
          val > 0 &&
          clickThroughHistory.length > 1 &&
          !isLast(currentIdx, clickThroughHistory))
        )
        ||
        (
          val < 0 &&
          currentIdx > 0
        ) ?
        true : false
      ;
      return canClick;
    }
    
    function makeArrow(val) {
      function handleArrowClick(e) {
        e.stopPropagation();
        const val = +e.target.value;
        if (!canClick(val)) return;
        setCurrentIdx(currentIdx + val);
      }

      if (addView.length) return;
      return <button
        type="button"
        id={val > 0 ? 'fwd-btn' : 'bwd-btn'}
        value={val}
        className={`${BTN_CLASSES} ${!canClick(val) ? 'faded' : ''}`}
        onClick={(e) => handleArrowClick(e)}
        style={!canClick(val) ? {'cursor': 'auto'} : {}}
      >
        {val > 0 ? '→' : '←'}
      </button>
    }

    const infoboxHeader = <div className="action-heading">
      <h5>
        {!addView.length ? quarry : 'Make a card'}
      </h5>
      <div style={{'display': 'flex'}}>
        {makeArrow(-1)}
        {makeArrow(1)}
        <button
          className={BTN_CLASSES}
          onClick={(e) => handleXClick(e)}
        >
          {!addView.length ? 'X' : '↩'}
        </button>
      </div>
    </div>;

    return infoboxHeader;
  }

  function makeInfoboxNav(){
    if (addView.length) return;

    function handleDictionaryClick(e) {
      e.stopPropagation();
      setActiveDict(e.target.innerText);
    }

    const infoboxNav = <div className="dictionary-bar">
      {
        refOrder.map((dictKey, idx0) => {
          if (dictKey === 'wikt' && dictionaries[dictKey].response.hasOwnProperty('1')) {
            return '';
          }
          return (
          dictionaries[dictKey] ?
          <Fragment key={dictKey + '-' + idx0}>
            <button
              className={`btn btn-link link-secondary toolbar-btn ${lexica[dictKey].name === activeDict ? 'active' : 'text-decoration-none'}`}
              data-bs-toggle={lexica[dictKey].name === activeDict ? 'button' : ''}
              aria-pressed={lexica[dictKey].name === activeDict ? 'true' : 'false'}
              onClick={(e) => handleDictionaryClick(e)}
              style={{'fontSize': 'small'}}
            >
              {lexica[dictKey].name}
            </button>
          </Fragment>
          :
          ''
        )})
      }
    </div>;
    return infoboxNav;
  }

  function makeInfoboxBody() {
    function makeCardForm() {
      return (<CardForm
        activeDict={activeDict}
        scrollId={props.scrollId}
        entry={addView[0]}
        decks={decks}
        wordId={props.wordId}
      />);
    }

    function makeDictionaryPanels() {
      return refOrder.map((dictabbr, idx0) => (
        <div
          key={`${dictabbr}-${idx0}`}
          style={{'display': activeDict === dictionaries[dictabbr].name ? 'block' : 'none'}}
        >
          <Dictionary
            mostRecent={dictionaries[dictabbr]}
            {...dictProps}
          />
        </div>
      ));
    }

    return addView.length ? makeCardForm() : makeDictionaryPanels();
  }

  return (
    <div
      className={`infobox`}
      ref={infoboxRef}
      style={{...getInfoboxPosition(), 'cursor': 'auto'}}
    >
      {makeInfoboxHeader()}
      {makeInfoboxNav()}
      {makeInfoboxBody()}
    </div>
  );
}