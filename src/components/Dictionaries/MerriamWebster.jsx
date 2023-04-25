import Entry from './Entry';
import { clipColon, clipNums, depunctuate, isLast } from '../../services/helpers';

export default function MerriamWebster(props) {
  const mw = props.mostRecent;
  const res = props.mostRecent.response;
  console.log(props.mostRecent)
  if (typeof(res[0]) === 'string') {
    return (
      <div className="error-message">
        <div>No result found.</div>
        <div>
          Similar words:
          <div>
            {
              res.map((alt, idx0) =>(
                <span key={alt + '-' + idx0}>
                  {
                    isLast(idx0, res) ? alt : (alt + ', ')
                  }
                </span>
              ))
            }
          </div>
        </div>
        <div>{res.resolution}</div>
      </div>
    )
  }

  function makeEntries(res) {;
    const ents = []
    for (let i = 0; i < res.length; i++) {
      const re = res[i];
      const entry = {
        'headword': clipColon(re.meta.id),
        'partOfSpeech': re.fl,
        'definitions': re.shortdef,
      };;
      ents.push(entry);
    }
    return ents;
  }

  const entries = makeEntries(res);
  const api = mw.name;

  return (
    <>
      {
        entries.map((entry, idx0) => (
          <Entry
            key={`${api.toLowerCase()}-${idx0}`}
            api={api}
            entry={entry}
            quarry={props.quarry}
          />
        ))
      }
    </>
  );
}