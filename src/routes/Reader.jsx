import { useState } from 'react';
import ReaderForm from '../components/ReaderForm';

export default function Reader() {
  const [submission, setSubmission] = useState({title: '', body: ''})
  console.log(`hitting the reader`)
  const reader = submission.body.length
    ?
    <div className="reader-body">{submission.body}</div>
    :
    <ReaderForm submission={[submission, setSubmission]} />
  ;
  return (
    <>
      <h1>

      </h1>
      {reader}
    </>
  );
};