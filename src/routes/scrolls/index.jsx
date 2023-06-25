import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { index as indexScrolls } from '../../services/scrolls';
import { capitalize, varToString } from '../../services/helpers';
import Preview from '../../components/Preview';

export async function loader() {
  const scrolls = await indexScrolls();
  return scrolls;
}

export default function ScrollIndex(props) {
  const scrolls = useLoaderData();
  useEffect(() => { // set document title
    document.title = props.makeDocTitle;
  }, []);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h3>Scrolls</h3>
        {   
          scrolls.length ?
            scrolls.map((scroll, idx1) => (
              <Preview
                key={idx1 + '-' + scroll._id}
                content={scroll.body ? scroll.body.slice(0,70) + '...' : ''}  
                createdBy={scroll.createdBy}
                docId={props._id}
                heading={scroll.title}
                link={`/scrolls/${scroll._id}`}
                updatedAt={scroll.updatedAt}
              />
            ))
            :
            'No scrolls to display.'
        }
      </div>
    </div>
  );
};