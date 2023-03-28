import { depunctuate } from '../services/helpers';
import { get, lexica } from '../services/dictionaries.js'

export default function Word(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  async function handleClick() {
    console.log(props.word)
    console.log(window.innerHeight);
    const lookup = depunctuate(props.word).toLowerCase();
    const termres = await get(lexica.wikt.args(lookup));
    const resObj = termres.title && termres.detail ? {
      error: true,
      title: termres.title,
      detail: termres.detail,
    }
    :
      termres
    ;
    const wikt = {
      ...lexica.wikt,
      'response': resObj,
    };
    const responses = {
      'term': lookup,
      'wikt': wikt,
    };
    setLookupHistory([...lookupHistory.slice(), responses]);
  }

  return (
    // <button
    //   className="btn btn-link link-dark text-decoration-none word-btn"
    //   onClick={() => handleClick()}
    // >
      <span className="word-span" onClick={() => handleClick()}>{props.word}</span>
    // </button>
  )
}