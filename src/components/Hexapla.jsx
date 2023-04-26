import { forwardRef, Fragment, useState } from 'react';
import Wiktionary from './Dictionaries/Wiktionary';
import FreeDictionary from './Dictionaries/FreeDictionary';
import MerriamWebster from './Dictionaries/MerriamWebster';
import BoxWord from './Dictionaries/BoxWord';
import { clipTags, isLast } from '../services/helpers';
import { lexica, refOrder } from '../services/dictionaries';

export default function Hexapla(props) {
  const quarry = props.mostRecent.quarry;
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const [activeDict, setActiveDict] = useState('Wiktionary');
  const [addView, setAddView] = useState(false);
  const [current, setCurrent] = useState(clickThroughHistory.length - 1);
  const dictionaries = props.mostRecent.dictionaries;

  function handleClick(e) {
    e.stopPropagation();
    setActiveDict(e.target.innerText);
  }

  const dictProps = {
    quarry: quarry,
    clickThroughHistory: [clickThroughHistory, setClickThroughHistory],
    handleRef: props.handleRef,
  };

  const pages = {
    'fd': function(mostRecent) {
      return <FreeDictionary mostRecent={mostRecent} {...dictProps} />;
    },
    'mw': function(mostRecent) {
      return <MerriamWebster mostRecent={mostRecent} {...dictProps}/>;
    },
    'wikt': function (mostRecent) {
      return <Wiktionary mostRecent={mostRecent} {...dictProps}/>;
    }
  };

  const dictionaryBar = <div className="dictionary-bar">
      {
        refOrder.map((dictKey, idx0) => (
          dictionaries[dictKey] ?
          <Fragment key={dictKey + '-' + idx0}>
            <button
              className={`btn btn-link link-secondary toolbar-btn ${lexica[dictKey].name === activeDict ? 'active' : 'text-decoration-none'}`}
              data-bs-toggle={lexica[dictKey].name === activeDict ? 'button' : ''}
              aria-pressed={lexica[dictKey].name === activeDict ? 'true' : 'false'}
              onClick={(e) => handleClick(e)}
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

  function handleAdd(e) {
    e.stopPropagation();
    setAddView(!addView);
  }

  function handleX(e) {
    e.stopPropagation();
    setLookupHistory([...lookupHistory.slice(), null]);
  }
  
  function makeHeading(headingText, source) {
    const isWiktionary = (
      source === 'Wiktionary' ?
        <>
          <button
            className='btn btn-link link-dark text-decoration-none'
            onClick={(e) => handleAdd(e)}
          >
            {addView ? 'Lookup View' : 'Add to deck'}
          </button>
        </>
        :
        ''
    );
    return (
      <div className="action-heading">
        <div style={{'display': 'flex'}}>
          <button
            className="btn btn-link link-secondary toolbar-btn text-decoration-none"
            style={{'font-size': 'largest'}}
          >
            ←
          </button>
          <h5>
            <BoxWord
              clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
              word={headingText}
            >
              {headingText}
            </BoxWord>
            {isWiktionary}
          </h5>

          <button
            className="btn btn-link link-secondary toolbar-btn text-decoration-none"
          >
            →
          </button>
        </div>
        <button
            className="btn btn-link link-secondary toolbar-btn text-decoration-none"
            onClick={(e) => handleX(e)}
          >
          X
        </button>          
      </div>
    );
  }

  const dictionary = 
    <>
      {makeHeading(props.mostRecent.quarry)}
      {dictionaryBar}
      {
        refOrder.map((dictKey, idx0) => (
          dictionaries[dictKey] && pages[dictKey] ?
          (
            <div
              key={dictKey + '-' + idx0 + '-' + dictionaries[dictKey].name }
              style={{'display': activeDict === dictionaries[dictKey].name ? 'block' : 'none'}}
            >
              {pages[dictKey](dictionaries[dictKey])}
            </div>
          )
          :
          ''
          )
        )
      }
    </>
  ;

  return (
    <>
      {dictionary}
    </>
  )
}