import { get, lexica } from '../services/dictionaries.js'

export default function Word(props) {

  async function handleClick() {
    const termres = await get(lexica.wikt.args(props.word));
    console.log(termres);
  }

  return (
    <button
      className="btn btn-link link-dark text-decoration-none word-btn"
      onClick={() => handleClick()}
    >
      {props.word}
    </button>
  )
}