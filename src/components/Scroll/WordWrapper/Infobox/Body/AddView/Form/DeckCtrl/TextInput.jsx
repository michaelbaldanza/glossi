export default function TextInput(props) {
  const [card, setCard] = props.card;
  const [newDeckName, setNewDeckName] = props.newDeckName;

  function handleChange(e) {
    setNewDeckName(e.target.value)
    setCard({
      ...card,
      [e.target.name]: e.target.value,
      'deckId': '',
    });
  }

  return (
    <div
    // style={{'display': 'flex', 'alignItems': 'flex-start'}}
  >
    {/* <label htmlFor="deck" style={{'flexShrink': '0', }}>
      Create a new deck and add this card to it:
    </label> */}
    <input
      name="deckName"
      type="text"
      className="form-control"
      placeholder="name the new deck"
      value={newDeckName}
      onChange={handleChange}
    />
  </div>
  );
};