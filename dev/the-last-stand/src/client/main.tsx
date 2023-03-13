import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { ProtectedRoute } from './routes/components/ProtectedRoute';
import Error from './components/Error';
import Home from './components/Home';
import Lobby from './components/Lobby';
import Login from './components/Login';
import Match from './components/Match';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route
        path='login'
        element={<Login />}
      />
      <Route
        path='/'
        element={<ProtectedRoute element={<Home />} />}
      />
      <Route
        path='/home'
        element={<ProtectedRoute element={<Home />} />}
      />
      <Route
        path='lobby/:lobbyId'
        element={<ProtectedRoute element={<Lobby />} />}
      />
      <Route
        path='match/:matchId'
        element={<ProtectedRoute element={<Match />} />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
