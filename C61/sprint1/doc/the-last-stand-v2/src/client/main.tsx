import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import './fonts/cyberpunks/Cyberpunks.ttf';

import { Error, Home, Lobby, Login, Match } from './pages';
import { App } from './components';
//import { loader as contactLoader } from './routes/contact';
//import { loader as rootLoader, action as rootAction } from './routes/root';
//import { EditContact, action as editAction } from './routes/edit';
//import { action as contactAction } from './routes/contact';
//import { action as destroyAction } from './routes/destroy';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='/'
          element={
            <Navigate
              replace
              to='login'
            /> //ref:https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb
          }
          errorElement={<Error />}
        />
        <Route
          path='/'
          element={<App />}
          errorElement={<Error />}>
          <Route errorElement={<Error />}>
            <Route
              path='home'
              element={<Home />}
            />
            <Route
              path='lobby/:lobbyId'
              element={<Lobby />}
            />
            <Route
              path='match/:matchId'
              element={<Match />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
