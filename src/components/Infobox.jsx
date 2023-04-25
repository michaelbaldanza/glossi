import Hexapla from './Hexapla';

export default function Infobox(props) {
  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
  // const [clickThroughHistory, setClickThroughHistory] = lookupHistory[lookupHistory.length - 1];
  const [x, y, bottom] = [
    props?.position.x,
    props?.position.y,
    props?.position.bottom
  ];
  const [rX, rWidth, rRight] = [
    props?.readerPosition.x,
    props?.readerPosition.width,
    props?.readerPosition.right
  ];

  const position = window.innerWidth > 767 ?
    {top: -(bottom - y + 12), left: rX + rWidth - x}
    :
    y > window.innerHeight / 2 ? {top: 0} : {bottom: 0}
  ;

  return (
      <div className={`infobox`} style={{...position, 'cursor': 'auto'}} >
        {
            props.mostRecent ?
            <div id="dictionary-container" className={``}>
            <Hexapla
              mostRecent={props.mostRecent}
              clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
              lookupHistory={props.lookupHistory}
            />
          </div>
          : ''
          }
      </div>
  )
}