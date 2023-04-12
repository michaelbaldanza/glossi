import { Form, redirect, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import ScrollForm from '../components/ScrollForm';
import { getScroll, update as updateScroll } from '../services/scrolls';
import { getUser } from '../services/users';

export async function loader({ params }) {
  const user = getUser();
  const scroll = await getScroll(params.scrollId);
  if (!user || user._id !== scroll.createdBy._id) {
    throw redirect(`/scrolls/${scroll._id}`)
  }
  return scroll;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateScroll(params.scrollId, updates);
  return redirect(`/scrolls/${params.scrollId}`);
}

export default function ScrollEdit() {
  const [user, setUser] = useOutletContext();
  const scroll = useLoaderData();
  const navigate = useNavigate();
  console.log(scroll)
  console.log(user)

  return (
    <>
      <ScrollForm scroll={scroll} />
    </>
  )
}