import { Fragment, useRef, useState } from 'react';
import Dictionary from './Dictionaries/Dictionary';
import BoxWord from './Dictionaries/BoxWord';
import { clipTags, isLast } from '../services/helpers';
import { lexica, refOrder } from '../services/dictionaries';

export default function Infobox(props) {
  
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const quarry = props.mostRecent.quarry;
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const dictionaries = props.mostRecent.dictionaries;
  const [activeDict, setActiveDict] = useState('Wiktionary');
  const [addView, setAddView] = useState(false);
  const infoboxRef = useRef(null);
  const dictProps = {
    quarry: quarry,
    currentIdx: [currentIdx, setCurrentIdx],
    clickThroughHistory: [clickThroughHistory, setClickThroughHistory],
    handleRef: props.handleRef,
  };
  function handleRef() {
    infoboxRef.current.scrollTop = 0;
  }

  function getInfoboxPosition() {
    /** The variables for calculating where the Infobox should render.
     * All values are in pixels.
     * x stores the distance of the left side of the rectangle containing the
     * word from the left side of the viewport. y and bottom do the same, but
     * from the top and bottom of the word, respectively, to the top of the
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
     * If the width of the window is greater than 767 px
     */
    const position = window.innerWidth > 767 ?
      {top: -((200 / 2) - ((bottom - y) / 2)), left: rRight - x}
      :
      y > window.innerHeight / 2 ? {top: 0} : {bottom: 0}
    ;

    return position;
  }

  function makeInfoboxHeader() {
    function handleAddClick(e) {
      e.stopPropagation();
      setAddView(!addView);
    }
    
    function handleArrowClick(e) {
      e.stopPropagation();
      const num = +e.target.value;
      setCurrentIdx(currentIdx + num);
    }

    function handleXClick(e) {
      e.stopPropagation();
      setLookupHistory([...lookupHistory.slice(), null]);
    }

    const isWiktionary = (
      activeDict === 'Wiktionary' ?
        <>
          <button
            className='btn btn-link link-dark text-decoration-none'
            onClick={(e) => handleAddClick(e)}
          >
            {addView ? 'Lookup View' : 'Add to deck'}
          </button>
        </>
        :
        ''
    );

    const infoboxHeader = <div className="action-heading">
      <div style={{'display': 'flex'}}>
        <button
          type="button"
          id="backward-btn"
          value="-1"
          className="btn btn-link link-secondary toolbar-btn text-decoration-none"
          onClick={(e) => handleArrowClick(e)}
        >
          ←
        </button>
        <h5>
          {quarry}
          {isWiktionary}
        </h5>

        <button
          type="button"
          value="1"
          id="forward-btn"
          className="btn btn-link link-secondary toolbar-btn text-decoration-none"
          onClick={(e) => handleArrowClick(e)}
        >
          →
        </button>
      </div>
      <button
          className="btn btn-link link-secondary toolbar-btn text-decoration-none"
          onClick={(e) => handleXClick(e)}
        >
        X
      </button>          
    </div>;

    return infoboxHeader;
  }

  function makeInfoboxNav(){
    function handleDictionaryClick(e) {
      e.stopPropagation();
      setActiveDict(e.target.innerText);
    }

    const infoboxNav = <div className="dictionary-bar">
      {
        refOrder.map((dictKey, idx0) => (
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
        ))
      }
    </div>;
    return infoboxNav;
  }

  return (
      <div className={`infobox`} ref={infoboxRef} style={{...getInfoboxPosition(), 'cursor': 'auto'}} >
        {makeInfoboxHeader()}
        {makeInfoboxNav()}
        {
          Object.keys(dictionaries).map((dictabbr, idx0) => (
            <div
              key={`${dictabbr}-${idx0}`}
              style={{'display': activeDict === dictionaries[dictabbr].name ? 'block' : 'none'}}
            >
              <Dictionary
                mostRecent={dictionaries[dictabbr]}
                {...dictProps}
              />
            </div>
          ))
        }
      </div>
  )
}