import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import App from './App';
import Index, { loader as indexLoader } from './routes/Index';
import Lookup from './routes/lookup';
import UserPage, { loader as userPageLoader } from './routes/UserPage'
import Login, { action as loginAction } from './routes/Login';
import { action as scrollDeleteAction } from './routes/ScrollDelete';
import ScrollEdit, { action as scrollEditAction, loader as scrollEditLoader } from './routes/ScrollEdit';
import ScrollPage, { loader as scrollLoader } from './routes/ScrollPage.jsx';
import Signup from './routes/Signup';
import Reader from './routes/Reader';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';


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
            element: <Index />,
            loader: indexLoader,
          },
          {
            path: 'scrolls/:scrollId',
            element: <ScrollPage />,
            loader: scrollLoader,
          },
          {
            path: 'scrolls/:scrollId/delete',
            action: scrollDeleteAction,
          },
          {
            path: 'scrolls/:scrollId/edit',
            element: <ScrollEdit />,
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
            path: 'profile',
            element: <UserPage />
          },
          {
            path:'lookup',
            element: <Lookup />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />
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
