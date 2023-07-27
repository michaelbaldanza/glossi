import { clipTags } from '../../../../../../../services/helpers';

export default function Checklist(props) {
  const [card, setCard] = props.card;
  function handleCheckbox(idx) {
    const newDefs = card.definitions.map(def => {
      if (def.idx === idx) {
        return { ...def, checked: !def.checked };
      }
      return def;
    });
    setCard({
      ...card,
      definitions: newDefs
    });
  }
  return (
    <fieldset>
      <legend><h6 style={{'fontSize': 'small'}}>Which definitions do you want to include?</h6></legend>
      {
        card.definitions.map((def, idx0) => {
          const key = 'checkbox-' + idx0;
          return (
            <div
              key={key}
              className="form-check"
              style={{'display': 'flex', 'alignItems': 'flex-start'}}
            >
              <input
                className="form-check-input"
                id={key}
                type="checkbox"
                checked={def.checked}
                onChange={() => handleCheckbox(def.idx)}
                style={{'marginRight': '10px'}}
              />
              <label
                className="form-check-label"
                style={{'width': '332px', 'hyphens': 'auto'}}
                htmlFor={key}
              >
                {clipTags(def.definition)}
              </label>
            </div>
          );
        })
      }
    </fieldset>
  );
};