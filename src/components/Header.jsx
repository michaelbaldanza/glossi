import BylineBar from './BylineBar';

export default function Header(props) {
  function makeAdditional() {
  return (
    props.additional.handleClick ?
    <button
      className="btn btn-link link-secondary text-decoration-none fst-italic"
      onClick={() => props.additional.handleClick()}
      style={{padding: '0'}}
    >
      {props.additional.text}
    </button>
    :
    <span
      className="secondary-text fst-italic"
      style={{fontSize: '1rem', padding: '0'}}
    >
      {props.additional.text}
    </span>
  )
  }

  return (
    <div className="item-header">
      <h3>
        {props.title ? props.title : 'untitled'}
        {' '}
        <span
          className="faded"
          style={{'fontSize': 'smaller'}}
        >
          {props.languageCode}
        </span>
        {props.additional ? makeAdditional() : ''}
      </h3>
      {
        props.createdBy ?
        <BylineBar
          createdBy={props.createdBy}
          languageCode={props.languageCode ? props.languageCode : false}
          link={props.link}
          title={props.title}
          updatedAt={props.updatedAt}
        />
        :
        ''
      }
    </div>
  );
};