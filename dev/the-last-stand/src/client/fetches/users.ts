import { APP_MODE, HOST_URL, HOST_PORT } from '../appConfig';

import avatar from '../assets/heroes/chuck/avatar.png';

// Get the current user from the server through the local cookie
export const getCurrentUser = async () => {
  //const avatar = APP_MODE === 'dev' ? './src/client/assets/heroes/chuck/avatar.png' : 'https://picsum.photos/500/600';

  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/current`, {
    credentials: 'include',
  });
  let data = await response.json();

  if (response.ok) {
    data.avatar = '/assets/heroes/chuck/avatar.png';
    return data;
  } else {
    return null;
  }
};

// Get all users from the server
export const getUsers = async () => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users`, {
    credentials: 'include',
  });
  let data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
};

// Patch the current user
export const patchCurrentUser = async (input: any) => {
  console.log('patch current received input', input);
  console.log('stringified input', JSON.stringify(input));

  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/current`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      let output = await response.json();
      return output;
    } else {
      throw new Error(`Failed to patch current user: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to patch current user: ${error.message}`);
  }
}; // improved by ChatGPT
