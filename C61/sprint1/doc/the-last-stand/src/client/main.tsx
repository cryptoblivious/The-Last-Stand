import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './styles/index.css';
import './fonts/cyberpunks/Cyberpunks.ttf';

import { Error, Home, Lobby, Login, Match } from './pages';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<Error />}>
//       <Route
//         path='login'
//         element={<Login />}
//       />
//       <Route
//         path='/'
//         element={
//           <Navigate
//             replace
//             to='login'
//           /> //ref:https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb
//         }>
//         <Route
//           path='home'
//           element={<Home />}
//         />
//         <Route
//           path='match/:matchId'
//           element={<Match />}
//         />
//       </Route>
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

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
