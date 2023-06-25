import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Index, {
  action as indexAction,
  loader as indexLoader
} from './routes/Index';
import Lookup from './routes/lookup';
import UserPage, { loader as userPageLoader } from './routes/UserPage'
import Login, { action as loginAction } from './routes/Login';
import { action as scrollDeleteAction } from './routes/scrolls/delete';
import ScrollEdit, { action as scrollEditAction, loader as scrollEditLoader } from './routes/scrolls/edit';
import ScrollPage, { loader as scrollLoader } from './routes/scrolls/show.jsx';
import Signup from './routes/Signup';
import Reader from './routes/Reader';
import DeckIndex, { loader as deckIndexLoader } from './routes/decks/index';
import DeckPage, { loader as deckLoader } from './routes/decks/show';
import DeckEdit, { action as deckEditAction, loader as deckEditLoader } from './routes/decks/edit';
import { action as deckDeleteAction } from './routes/decks/delete';
import ScrollIndex, { loader as scrollIndexLoader } from './routes/scrolls/index';
import CardPage, { loader as cardLoader } from './routes/decks/cards/show';
import { action as cardDeleteAction } from './routes/decks/cards/delete';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';

function makeDocTitle(pageTitle) {
  const siteTitle = 'Glossi';
  const etc = pageTitle ? pageTitle + ' - ' : '';
  return etc + siteTitle;
}

const ScrollNew = () => useRoutes(['/scrolls/new', '/scrolls/:scrollId/edit'].map(path => ({
  path,
  element: <ScrollEdit makeDocTitle={makeDocTitle} />,
  action: scrollEditAction,
  loader: scrollEditLoader,
})))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index makeDocTitle={makeDocTitle()} />,
            action: indexAction,
            loader: indexLoader,
          },
          {
            path: 'scrolls',
            element: <ScrollIndex makeDocTitle={makeDocTitle('Scrolls')} />,
            loader: scrollIndexLoader,
          },
          {
            path: 'scrolls/new',
            element: <ScrollEdit makeDocTitle={makeDocTitle} />,
            action: scrollEditAction,
            loader: scrollEditLoader,
          },
          {
            path: 'scrolls/:scrollId/edit',
            element: <ScrollEdit makeDocTitle={makeDocTitle} />,
            action: scrollEditAction,
            loader: scrollEditLoader,
          },
          {
            path: 'scrolls/:scrollId',
            element: <ScrollPage makeDocTitle={makeDocTitle} />,
            loader: scrollLoader,
          },
          {
            path: 'scrolls/:scrollId/delete',
            action: scrollDeleteAction,
          },
          {
            path: 'reader',
            element: <Reader />,
          },
          {
            path: 'users/:username',
            element: <UserPage />,
            loader: userPageLoader,
          },
          {
            path: 'decks',
            element: <DeckIndex makeDocTitle={makeDocTitle('Decks')} />,
            loader: deckIndexLoader,
          },
          {
            path: 'decks/:deckId',
            element: <DeckPage makeDocTitle={makeDocTitle} />,
            loader: deckLoader,
          },
          {
            path: 'decks/:deckId/edit',
            element: <DeckEdit makeDocTitle={makeDocTitle} />,
            action: deckEditAction,
            loader: deckEditLoader,
          },
          {
            path: 'decks/:deckId/delete',
            action: deckDeleteAction,
          },
          {
            path: 'decks/:deckId/cards/:cardId',
            element: <CardPage makeDocTitle={makeDocTitle} />,
            loader: cardLoader,
          },
          {
            path: 'decks/:deckId/cards/:cardId/delete',
            action: cardDeleteAction,
          },
          {
            path: 'profile',
            element: <UserPage />
          },
          {
            path:'lookup',
            element: <Lookup />,
          },
          {
            path: 'login',
            element: <Login makeDocTitle={makeDocTitle('Login')} />,
          },
          {
            path: 'signup',
            element: <Signup makeDocTitle={makeDocTitle('Signup')} />
          }
        ]
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
