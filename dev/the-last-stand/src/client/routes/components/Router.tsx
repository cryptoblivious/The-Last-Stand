import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Error from '../../components/Error';
import Home from '../../components/Home';
import Lobby from '../../components/Lobby';
import Login from '../../components/Login';
import Match from '../../components/Match';
import Heroes from '../../components/Heroes';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route
        path='/'
        element={<ProtectedRoute element={<Home />} />}
      />
      <Route
        path='login'
        element={
          <ProtectedRoute
            element={<Login />}
            userAuth={false}
            redirects='/home'
          />
        }
      />
      <Route
        path='home'
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
      <Route
        path='heroes'
        element={<ProtectedRoute element={<Heroes />} />}
      />
    </Route>
  )
);

export default Router;
