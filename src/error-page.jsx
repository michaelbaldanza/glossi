import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage(props) {
  const error = useRouteError();
  const message = error.message;
  const name = error.name;
  console.error(`${error.name}
  ${error.message}
  ${error.stack}`);

  useEffect(() => { // set document title
    document.title = `${name} - Glossi`
  }, []);

  return (
    <div id="error-page">
      {/* <h1>{title}</h1>
      <p>
        {<i>{details}</i>}
      </p> */}
      <h1>{name}</h1>
      <p>
        {<i>{message}</i>}
      </p>
    </div>
  )
}