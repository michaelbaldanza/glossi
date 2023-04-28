import Entry from './Entry';
import { clipColon, isLast } from '../../services/helpers';

export default function Dictionary(props) {
  
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const abbr = props.mostRecent.abbr;
  const res = props.mostRecent.response;
  const api = props.mostRecent.name;
  function makeLanguageNav() {
    if (abbr !== 'wikt') return;

  }

  const pages = {
    'fd': function() {
      if (res.title) { // error handling
        return (
          <div className="error-message">
            <div>{res.title}</div>
            <div>{res.message}</div>
            <div>{res.resolution}</div>
          </div>
        );
      }

      return(
        <>
          {
            res.map((term, idx0) => (
              <div key={`term-${idx0}`}>
                {
                  term.meanings.map((meaning, idx1) => (
                    <Entry
                      key={`${api}-${idx1}`}
                      currentIdx={[currentIdx, setCurrentIdx]}
                      clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
                      entry={meaning}
                      idx1={idx1}
                      api={api}
                      quarry={props.mostRecent.quarry}
                      handleRef={props.handleRef}
                    /> 
                  ))
                }
              </div>
            )) 
          }
        </>
      )
    },
    'mw': function() {
      if (typeof(res[0]) === 'string') { // error handling
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
      return (
        <>
          {
            ents.map((entry, idx0) => (
              <Entry
                key={`${api.toLowerCase()}-${idx0}`}
                currentIdx={[currentIdx, setCurrentIdx]}
                clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
                api={api}
                entry={entry}
                quarry={props.quarry}
                handleRef={props.handleRef}
              />
            ))
          }
        </>
      );
    },
    'wikt': function() {
      if (res.title) { // error handling
        return (
          <div className="error-message">
            <div>{res.title}</div>
            <div>{res.detail}</div>
          </div>
        );
      }
      if (abbr !== 'wikt') return;
      const langs = Object.keys(res);
      let selLang = langs[0];
      return <>
      {
        langs.map((lang, idx0) => (
          res[lang].map((entry, idx1) => (
            <Entry
              key={`${api.toLowerCase()}-${idx0}-${idx1}`}
              currentIdx={[currentIdx, setCurrentIdx]}
              api={api}
              clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
              entry={entry}
              selLang={selLang}
              lang={lang}
              idx1={idx1}
              quarry={props.mostRecent.quarry}
              handleRef={props.handleRef}
            />
          ))
        ))
      }
      </>
    }
  };
  /**
   * It should be possible to access pages through abbr, and I'd have this
   * component return
   * pages[abbr]()
   * instead of having this if/else if chain.
   */
  if (abbr === 'wikt') {
    return pages['wikt']();
  } else if (abbr === 'fd') {
    return pages['fd']();
  } else if (abbr === 'mw') {
    return pages['mw']();
  }
}