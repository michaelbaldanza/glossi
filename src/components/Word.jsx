import { get, lexica } from '../services/dictionaries.js'

export default function Word(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;
  console.log(`here's the lookup histroy`)
  console.log(lookupHistory)

  async function handleClick() {
    const termres = await get(lexica.wikt.args(props.word.toLowerCase()));
    console.log(termres);
    console.log(...lookupHistory.slice());
    setLookupHistory([...lookupHistory.slice(), termres]);
  }

  return (
    <button
      className="btn btn-link link-dark text-decoration-none word-btn"
      onClick={() => handleClick()}
    >
      <span className="word-span">{props.word}</span>
    </button>
  )
}