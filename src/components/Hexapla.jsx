import { useState } from 'react';
import Wiktionary from './Dictionaries/Wiktionary';
import FreeDictionary from './Dictionaries/FreeDictionary';
import { clipTags } from '../services/helpers';
import { lexica } from '../services/dictionaries';

export default function Hexapla(props) {
  const [activeDict, setActiveDict] = useState('Wiktionary');
  const [addView, setAddView] = useState(false);
  const [lookupHistory, setLookupHistory] = props.lookupHistory;

  function handleClick(e) {
    e.stopPropagation();
    setActiveDict(e.target.innerText);
  }

  const dictKeys = Object.keys(lexica);

  const dictionaryBar = <div className="dictionary-bar">
      {
        dictKeys.map((dictKey, idx0) => (
          <button
            key={dictKey + '-' + idx0}
            className={`btn btn-link link-secondary toolbar-btn ${lexica[dictKey].name === activeDict ? 'active' : 'text-decoration-none'}`}
            data-bs-toggle={lexica[dictKey].name === activeDict ? 'button' : ''}
            aria-pressed={lexica[dictKey].name === activeDict ? 'true' : 'false'}
            onClick={(e) => handleClick(e)}
            style={{'fontSize': 'small'}}
          >
            {lexica[dictKey].name}
          </button>
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
          <h5>{headingText} {isWiktionary}</h5>
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
    <div id="hexapla" className="">
      {makeHeading(props.mostRecent.quarry)}
      {dictionaryBar}
      <div
        id="wiktionary"
        style={{'display': activeDict === 'Wiktionary' ? 'block' : 'none'}}
      >
        <Wiktionary mostRecent={props.mostRecent} />
      </div>
      <div
        id="free-dictionary"
        style={{'display': activeDict === 'Free Dictionary' ? 'block' : 'none'}}
      >
        <FreeDictionary mostRecent={props.mostRecent} />
      </div>
    </div>
  ;

  return (
    <>
      {dictionary}
    </>
  )
}

// props.mostRecent.fd.response.map((entry, idx0) => (
//   <div key={`entry-${idx0}`}>
//     {
//       entry.meanings.map((meaning, idx1) => (
//         <div key={`meaning-${idx0}-${idx1}`}>
//           {
//             meaning.definitions.map((definition, idx2) => (
//               <div key={`definition-${idx0}-${idx1}-${idx2}`}>
//                 {
//                   definition.definition
//                 }
//               </div>
//             ))
//           }
//         </div>
//       ))
//     }
//   </div>
// ))