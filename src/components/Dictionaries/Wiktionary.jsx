import { useState } from 'react';
import { clipTags } from '../../services/helpers';
import { lexica } from '../../services/dictionaries';

export default function Wiktionary(props) {
  const wikt = props.mostRecent.wikt;
  const res = wikt.response;
  const langs = Object.keys(res);
  const [selLang, setSelLang] = useState(langs[0]);
  if (res.error) {
    return (
      <div>
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
    return (
      res[lang].map((entry, idx1) => (
        <div
          key={`entry-${idx1}`}
          style={{
            'display': selLang === lang ? 'block' : 'none'
          }}
        >
          <h6 className="faded" style={{'fontSize': 'smaller'}}>
            {entry.partOfSpeech.toLowerCase()}
            {lang === 'other' ? ' - ' + entry.language : ''}
          </h6>
          <ol>
            {
              entry.definitions.map((sense, idx2) => (
                <li key={`sense-${idx1}-${idx2}`}>
                  {
                    clipTags(sense.definition)
                  }
                </li>
              ))
            }
          </ol>
        </div>
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