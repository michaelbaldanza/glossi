import { Fragment, useState } from 'react';
import Entry from './Entry';
import { clipColon, isLast } from '../../services/helpers';

export default function Dictionary(props) {
  
  const [currentIdx, setCurrentIdx] = props.currentIdx;
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  const abbr = props.mostRecent.abbr;
  const res = props.mostRecent.response;
  const api = props.mostRecent.name;

  const langs = api === 'Wiktionary' ? Object.keys(res) : null;
  const [selLang, setSelLang] = useState(
    langs ? langs[0] : null
  )

  function mapEntries(entryArr, customProps) {
    const entryMap = entryArr.map((entry, idx1) => {
      const entryProps = {
        key: `${api.toLowerCase()}-${idx1}`,
        currentIdx: [currentIdx, setCurrentIdx],
        clickThroughHistory: [clickThroughHistory, setClickThroughHistory],
        entry: entry,
        idx1: idx1,
        api: api,
        quarry: props.quarry,
        handleRef: props.handleRef,
      };
      Object.assign(entryProps, customProps)
      return <Entry {...entryProps}/>;
    })
    return entryMap;
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

      return res.map((term, idx0) => mapEntries(term.meanings));
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
      return mapEntries(ents);
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

      function handleLangClick(e) {
        e.stopPropagation();
        setSelLang(e.target.innerText);
      }

      const langBar = langs.map((lang, idx1) => (
        <button
          key={lang + '-' + '-' + idx1}
          className={`btn btn-link link-secondary toolbar-btn ${lang === selLang ? 'active' : 'text-decoration-none'}`}
          data-bs-toggle={lang === selLang ? 'button' : ''}
          aria-pressed={lang === selLang ? 'true' : 'false'}
          onClick={(e) => handleLangClick(e)}
          style={{'fontSize': 'smaller'}}
        >
          {lang}
        </button>
      ));

      return <>
          {langBar}
          {
            langs.map((lang, idx0) => (
              mapEntries(res[lang], { selLang: selLang, lang: lang })
            ))
          }
      </>;
      
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