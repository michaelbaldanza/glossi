import { depunctuate, swapMacron } from '../../../services/helpers';
import { collect } from '../../../services/dictionaries.js'

export default function Word(props) {
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const isActive = props.active;
  async function handleClick(e) {
    e.stopPropagation();
    if (isActive || props.isQuarry) return;
    const term = swapMacron(depunctuate(props.word));
    console.log(term)
    const response = {
      'quarry': term,
      'wordId': props.wordId,
      'dictionaries': await collect(term),
    };
    console.log(response)
    setClickThroughHistory([...clickThroughHistory.slice(0, currentIdx + 1), response]);
    if (props.isBoxWord) {
      setCurrentIdx(currentIdx + 1);
      const dictionaries = response.dictionaries;
      if (
        dictionaries.wikt &&
        !dictionaries.wikt.response.title &&
        !dictionaries.wikt.response[props.selLang[0]]
      ) {
        props.selLang[1](Object.keys(dictionaries.wikt.response)[0]);
      }
      props.handleRef();
    }
    if (props.lookupHistory) {
      const [lookupHistory, setLookupHistory] = props.lookupHistory;
      setLookupHistory([
        ...lookupHistory.slice(),
        props.wordId
      ]);
      props.handleWrapperClick(e.target.parentNode);
    }
  }

  return (
    <span
      id={props.wordId}
      className={`word-span ${isActive ? 'highlighted' : ''}`}
      style={props.isQuarry ? {'cursor': 'auto'} : {'':''}}
      onClick={(e) => handleClick(e)}
    >
      {props.word}
    </span>
  )
}