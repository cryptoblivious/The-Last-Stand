import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import './styles/index.css';
import { ErrorPage } from './components';
import { Contact, Root, Index } from './routes';
import { loader as contactLoader } from './routes/contact';
import { loader as rootLoader, action as rootAction } from './routes/root';
import { EditContact, action as editAction } from './routes/edit';
import { action as contactAction } from './routes/contact';
import { action as destroyAction } from './routes/destroy';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Root />}
			loader={rootLoader}
			action={rootAction}
			errorElement={<ErrorPage />}>
			<Route errorElement={<ErrorPage />}>
				<Route
					index
					element={<Index />}
				/>
				<Route
					path='contacts/:contactId'
					element={<Contact />}
					loader={contactLoader}
					action={contactAction}
				/>
				<Route
					path='contacts/:contactId/edit'
					element={<EditContact />}
					loader={contactLoader}
					action={editAction}
				/>
				<Route
					path='contacts/:contactId/destroy'
					action={destroyAction}
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
