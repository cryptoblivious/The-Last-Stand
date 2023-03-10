import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Error, Home, Lobby, Login, Match } from './components';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route errorElement={<Error />}>
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
          />
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
