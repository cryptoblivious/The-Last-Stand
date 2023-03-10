import { Outlet as RouterOutlet, Link, useLoaderData, Form as RouterForm, redirect, NavLink, useNavigation, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import { getContacts, createContact } from '../common/functions/contacts';

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const contacts = await getContacts(q);
	return { contacts, q };
}

export default function Root() {
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q]);

	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<RouterForm
						id='search-form'
						role='search'>
						<input
							aria-label='Search contacts'
							id='q'
							className={searching ? 'loading' : ''}
							placeholder='Search'
							name='q'
							type='search'
							defaultValue={q}
							onChange={(e) => {
								const isFirstSearch = q == null;
								submit(e.currentTarget.form, { replace: !isFirstSearch });
							}}
						/>
						<div
							id='search-spinner'
							aria-hidden
							hidden={!searching}
						/>
						<div
							className='sr-only'
							aria-live='polite'></div>
					</RouterForm>
					<RouterForm method='post'>
						<button type='submit'>New</button>
					</RouterForm>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
										{' '}
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id='detail'
				className={navigation.state === 'loading' ? 'loading' : ''}>
				<RouterOutlet />
			</div>
		</>
	);
}
