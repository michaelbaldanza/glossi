import { depunctuate } from '../../services/helpers';
import { collect, get, lexica } from '../../services/dictionaries.js'

export default function BoxWord(props) {
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const term = depunctuate(props.word).toLowerCase();

  async function handleClick(e) {
    if (props.isQuarry) return;
    const response = {
      'quarry': term,
      'wordId': props.wordId,
      'dictionaries': await collect(term),
    };
    setClickThroughHistory([...clickThroughHistory.slice(0, currentIdx + 1), response]);
    setCurrentIdx(currentIdx + 1);
    props.handleRef();
  }

  return (
    <span
      className="word-span"
      style={props.isQuarry ? {'cursor': 'auto'} : {'':''}}
      onClick={(e) => handleClick(e)}
    >
      {props.word}
    </span>
  )
}