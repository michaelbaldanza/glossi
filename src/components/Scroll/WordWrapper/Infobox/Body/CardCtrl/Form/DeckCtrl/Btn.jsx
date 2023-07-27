export default function Btn(props) {
  const [activeDeckInput, setActiveDeckInput] = props.activeDeckInput;
  const id = props.id;
  const text = props.text;

  const isActive = activeDeckInput === id ? true : false;

  function handleClick(e) {
    setActiveDeckInput(isActive ? null : id);
  }

  return (
    <button
      className={`btn btn-outline-dark ${isActive ? 'show' : 'hide'}`}
      id={id}
      type="button"
      onClick={(e) => handleClick(e)}
    >
      {text}
    </button>
  );
};