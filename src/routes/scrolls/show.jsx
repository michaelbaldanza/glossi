import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { get as getScroll } from '../../services/scrolls';
import Scroll from  '../../components/Scroll/Scroll';

export async function loader({ params, request }) {
  const path = new URL(request.url).pathname;
  const scroll = await getScroll(params.scrollId, path);
  return scroll;
}

export default function ScrollPage(props) {
  useEffect(() => { // set document title
    const scrollStr = scroll.title ? scroll.title : 'Untitled';
    document.title = props.makeDocTitle('Scroll: ' + scrollStr);
  }, []);

  const scroll = useLoaderData();

  return (
    <>
    <Scroll scroll={scroll} />
    </>
      
  )
}