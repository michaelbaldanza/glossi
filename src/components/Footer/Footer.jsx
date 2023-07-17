import Icon from './Icon/Icon';

export default function Footer() {
  return (
    <footer className="container-fluid">
      <div className="toe" id="api-container">
        <div className="icon-container">
          <Icon abbr={'mw'} />
          <Icon abbr={'wikt'} />
          <a className="toe-link text-decoration-none" href="https://dictionaryapi.dev/" title="Free Dictionary API">
            Free Dictionary API
          </a>
        </div>
      </div>
      <div className="toe" id="about-container">
        <div className="icon-container">
          <Icon abbr={'gh'} />
          <Icon abbr={'li'} />
        </div>
      </div>
    </footer>
  )
}
