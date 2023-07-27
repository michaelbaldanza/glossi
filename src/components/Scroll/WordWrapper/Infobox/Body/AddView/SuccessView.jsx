export default function SuccessView(props) {
  const deckName = props.deckName;
  const title = props.title;

  return (
    <div>
      <h1>Success</h1>
      <p>Created a card for "{title}" and added it to the deck "{deckName}".</p>
    </div>
  );
};