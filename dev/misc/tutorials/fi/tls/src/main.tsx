// UP TO CANCEL BUTTON

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { App, ErrorPage } from './components';
import { Contact, Root, Index } from './routes';
import { loader as contactLoader } from './routes/contact';
import { loader as rootLoader, action as rootAction } from './routes/root';
import { EditContact, action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';

const br = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				index: true,
				// element: <App />,
				element: <Index />,
			},
			{
				path: '/contacts/:contactId',
				element: <Contact />,
				loader: contactLoader,
			},
			{
				path: 'contacts/:contactId/edit',
				element: <EditContact />,
				loader: contactLoader,
				action: editAction,
			},
			{
				path: 'contacts/:contactId/destroy',
				action: destroyAction,
				errorElement: <div>Oops! There was an error.</div>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={br} />
		{/* <App /> */}
	</React.StrictMode>
);
