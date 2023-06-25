import BylineBar from './BylineBar';

export default function Header(props) {
  return (
    <div className="item-header">
      <h3>
        {props.title ? props.title : 'untitled'}
        &nbsp;
        <span
          className="faded"
          style={{'fontSize': 'smaller'}}
        >
          {props.languageCode}
        </span>
      </h3>
      <BylineBar
        createdBy={props.createdBy}
        languageCode={props.languageCode ? props.languageCode : false}
        link={props.link}
        title={props.title}
        updatedAt={props.updatedAt}
      />
    </div>
  );
};