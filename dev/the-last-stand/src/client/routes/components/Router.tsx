import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import MainPageSwitcher from '../../components/MainPageSwitcher';
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
        element={
          <ProtectedRoute
            element={<MainPageSwitcher />}
            userAuth='both'
          />
        }
      />
      <Route
        path='login'
        element={
          <ProtectedRoute
            element={<Login />}
            userAuth='both'
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

// import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import Error from '../../components/Error';
// import Home from '../../components/Home';
// import Lobby from '../../components/Lobby';
// import Login from '../../components/Login';
// import Match from '../../components/Match';
// import Heroes from '../../components/Heroes';

// const Router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<Error />}>
//       <Route
//         path='/'
//         element={<Home />}
//       />
//       <Route
//         path='login'
//         element={<Login />}
//       />
//       <Route
//         path='home'
//         element={<Home />}
//       />
//       <Route
//         path='lobby/:lobbyId'
//         element={<Lobby />}
//       />
//       <Route
//         path='match/:matchId'
//         element={<Match />}
//       />
//       <Route
//         path='heroes'
//         element={<Heroes />}
//       />
//     </Route>
//   )
// );

// export default Router;
