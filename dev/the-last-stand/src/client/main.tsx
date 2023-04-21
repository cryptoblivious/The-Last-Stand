import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import ColyseusProvider from './components/ColyseusProvider';

import Router from './routes/components/Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColyseusProvider>
      <RouterProvider router={Router} />
    </ColyseusProvider>
  </React.StrictMode>
);
