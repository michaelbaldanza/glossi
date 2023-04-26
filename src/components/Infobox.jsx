import {useRef} from 'react';
import Hexapla from './Hexapla';

export default function Infobox(props) {
  const infoboxRef = useRef(null);
  function handleRef() {
    infoboxRef.current.scrollTop = 0;
  }

  const [clickThroughHistory, setClickThroughHistory] = props.clickThroughHistory;
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
      <div className={`infobox`} ref={infoboxRef} style={{...position, 'cursor': 'auto'}} >
        <Hexapla
          handleRef={handleRef}
          wordId={props.wordId}
          mostRecent={props.mostRecent}
          clickThroughHistory={[clickThroughHistory, setClickThroughHistory]}
          lookupHistory={props.lookupHistory}
        />
      </div>
  )
}