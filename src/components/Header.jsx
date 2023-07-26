import BylineBar from './BylineBar';

export default function Header(props) {
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
        {props.additional ? props.additional : ''}
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