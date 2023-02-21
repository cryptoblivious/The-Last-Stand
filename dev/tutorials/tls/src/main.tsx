import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import './styles/index.css';
import { Error, Home, Lobby, Login, Match } from './pages';
import { App } from './components';
//import { loader as contactLoader } from './routes/contact';
//import { loader as rootLoader, action as rootAction } from './routes/root';
//import { EditContact, action as editAction } from './routes/edit';
//import { action as contactAction } from './routes/contact';
//import { action as destroyAction } from './routes/destroy';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<App />}
			//loader={rootLoader}
			//action={rootAction}
			errorElement={<Error />}>
			<Route errorElement={<Error />}>
				<Route
					index
					element={<Login />}
				/>
				<Route
					path='home'
					element={<Home />}
					//loader={contactLoader}
					//action={contactAction}
				/>
				<Route
					path='lobby/:lobbyId'
					element={<Lobby />}
					//loader={contactLoader}
					//action={editAction}
				/>
				<Route
					path='match/:matchId'
					element={<Match />}
				/>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
