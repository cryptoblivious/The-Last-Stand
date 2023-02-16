import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RousterProvider, } from 'react-router-dom';
import './styles/index.css';
import { App, ErrorPage } from './components';
import { Contact, Root } from './routes';
import { loader as rootLoader } from './routes/root';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: '/contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
);
