import { Fragment, useState } from 'react';
import Entry from './Entry';
import { clipColon, isLast } from '../../services/helpers';
import { BTN_CLASSES } from '../../services/constants';

export default function Dictionary(props) {
  const [addView, setAddView] = props.addView;
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
    if (!entryArr) return;
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
        abbr: abbr,
        isLast: isLast(idx1, entryArr),
        addView: [addView, setAddView],
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
        };
        ents.push(entry);
      }
      return mapEntries(ents);
    },
    'odus': function() {
      if (res === 'error') {
        return <div>error</div>
      }
    },
    'wikt': function() {
      function checkLanguages() {
        // work around for lack of response in mobile
        const langCodes = ['en', 'de', 'fr', 'la', 'it', 'other'];
        for (let i = 0; i < langCodes.length; i++) {
          if (res.hasOwnProperty(langCodes[i])) {
            return true;
          }
        }
        return false;
      }
      console.log(res)
      if (res.title || !checkLanguages()) { // error handling
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
          <div className="lang-bar">
            {langBar}
          </div>
          {
            langs.map((lang, idx0) => (
              mapEntries(res[lang], { selLang: selLang, lang: lang })
            ))
          }
      </>;
      
    }
  };
  return pages[abbr]();
}