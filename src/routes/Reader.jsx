import { useState } from 'react';
import ReaderForm from '../components/ReaderForm';
import Scroll from '../components/Scroll/Scroll';

export default function Reader() {
  const [editMode, setEditMode] = useState(false);
  const [submission, setSubmission] = useState({title: '', body: ''})

  function makeReader() {
    if (editMode) {
      return (
        <Scroll 
          scroll={submission}
          reader={true}
        />
      )
    }
    return (
      <ReaderForm
        submission={[submission, setSubmission]}
        editMode={[editMode, setEditMode]}
      />
    )
  }

  return (
    <>
      {makeReader()}
    </>
  );
};