import { depunctuate, swapMacron } from '../../services/helpers';
import { collect, get, lexica } from '../../services/dictionaries.js'

export default function BoxWord(props) {
  const [selLang, setSelLang] = props.selLang;
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const term = swapMacron(depunctuate(props.word)).toLowerCase();

  async function handleClick(e) {
    if (props.isQuarry) return;
    const response = {
      'quarry': term,
      'wordId': props.wordId,
      'dictionaries': await collect(term),
    };
    setClickThroughHistory([...clickThroughHistory.slice(0, currentIdx + 1), response]);
    setCurrentIdx(currentIdx + 1);
    const dictionaries = response.dictionaries;
    if (
      dictionaries.wikt &&
      !dictionaries.wikt.response.title &&
      !dictionaries.wikt.response[selLang]
    ) {
      setSelLang(Object.keys(dictionaries.wikt.response)[0]);
    }
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