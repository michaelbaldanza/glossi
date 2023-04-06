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
import Profile from './routes/Profile'
import Login, { action as loginAction } from './routes/Login';
import ScrollPage, { loader as scrolLoader } from './routes/ScrollPage.jsx';
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
            loader: scrolLoader,
          },
          {
            path: 'reader',
            element: <Reader />,
          },
          {
            path: 'profile',
            element: <Profile />
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
