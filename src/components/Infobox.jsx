import Hexapla from './Hexapla';

export default function Infobox(props) {
  const [lookupHistory, setLookupHistory] = props.lookupHistory;

  const position = props.y > window.innerHeight / 2 ? 'top' : 'bottom';
  if (props.y < window.innerHeight / 2) {
    console.log('bottom');
  } else {
    console.log('top')
  }
  return (
      <div className={`infobox infobox-${position}`} >
        {
            props.mostRecent ?
            <div id="dictionary-container" className={``}>
            <Hexapla mostRecent={props.mostRecent} lookupHistory={[lookupHistory, setLookupHistory]}/>
          </div>
          : ''
          }
      </div>
  )
}