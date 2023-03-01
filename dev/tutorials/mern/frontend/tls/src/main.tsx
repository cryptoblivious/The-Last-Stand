import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
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
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={<App />}
            errorElement={<Error />}>
            <Route errorElement={<Error />}>
              <Route
                index
                element={<Login />}
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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
