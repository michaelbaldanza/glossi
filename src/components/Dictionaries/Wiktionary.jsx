import { useState } from 'react';
import Entry from './Entry';
import { clipTags } from '../../services/helpers';
import { lexica } from '../../services/dictionaries';

export default function Wiktionary(props) {
  const wikt = props.mostRecent;
  const res = wikt.response;
  const langs = Object.keys(res);
  const [selLang, setSelLang] = useState(langs[0]);
  if (res.title) {
    return (
      <div className="error-message">
        <div>{res.title}</div>
        <div>{res.detail}</div>
      </div>
    );
  }

  function handleClick(e) {
    e.stopPropagation();
    setSelLang(e.target.innerText);
  }
  
  const pages = langs.map((lang, idx0) => {
    const api = wikt.name;

    return (
      res[lang].map((entry, idx1) => (
        <Entry
          key={`${api.toLowerCase()}-${idx0}-${idx1}`}
          api={api}
          entry={entry}
          selLang={selLang}
          lang={lang}
          idx1={idx1}
          quarry={props.mostRecent.quarry}
        />
      ))
    )
  });
  
  return (
    <>
      {
        langs.map((lang, idx0) => (
          <button
            className={`btn btn-link link-secondary toolbar-btn ${lang === selLang ? 'active' : 'text-decoration-none'}`}
            data-bs-toggle={lang === selLang ? 'button' : ''}
            aria-pressed={lang === selLang ? 'true' : 'false'}
            key={lang + '-' + idx0}
            onClick={(e) => handleClick(e)}
            style={{'fontSize': 'smaller'}}
          >
            {lang}
          </button>
        ))
      }
      {pages}
    </>
  );
};