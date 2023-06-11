import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
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
import { action as scrollDeleteAction } from './routes/ScrollDelete';
import ScrollEdit, { action as scrollEditAction, loader as scrollEditLoader } from './routes/ScrollEdit';
import ScrollPage, { loader as scrollLoader } from './routes/ScrollPage.jsx';
import Signup from './routes/Signup';
import Reader from './routes/Reader';
import DeckIndex, { loader as deckIndexLoader } from './routes/decks/index';
import DeckPage, { loader as deckLoader } from './routes/decks/show';
import CardPage from './routes/decks/cards/showcard';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';

function makeTitle(route) {
  const siteTitle = 'Glossi';
  if (route === 'index') {
    return siteTitle;
  } else {
    const element = {
      'scrolls index': 'Scrolls',
      'scroll edit': 'Edit ',
      'scroll': '',
      'login': 'Log in',
      'signup': 'Sign up'
    };
    return siteTitle + ' - ' + element[route];
  }
}

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
            element: <Index title={makeTitle('index')} />,
            action: indexAction,
            loader: indexLoader,
          },
          {
            path: 'scrolls/:scrollId',
            element: <ScrollPage title={makeTitle('scroll')} />,
            loader: scrollLoader,
          },
          {
            path: 'scrolls/:scrollId/delete',
            action: scrollDeleteAction,
          },
          {
            path: 'scrolls/:scrollId/edit',
            element: <ScrollEdit title={makeTitle('scroll')} />,
            action: scrollEditAction,
            loader: scrollEditLoader,
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
            element: <DeckIndex />,
            loader: deckIndexLoader,
          },
          {
            path: 'decks/:deckId',
            element: <DeckPage />,
            loader: deckLoader,
          },
          {
            path: 'decks/:deckId/cards/:cardId',
            element: <CardPage />
            // loader: cardLoader,
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
            element: <Login title={makeTitle('login')} />,
          },
          {
            path: 'signup',
            element: <Signup title={makeTitle('signup')} />
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
