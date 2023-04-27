import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Room, Client } from 'colyseus.js';
import { WS_PROTOCOL, HOST_NAME, HOST_PORT } from './../appConfig';
import { IUser } from './../../typescript/interfaces/IUser';
import { AppState } from './../../server/rooms/states/AppState';
import { patchCurrentUser, getCurrentUser } from './../fetches/users';

interface ColyseusContextProps {
  client: Client | null;
  appRoom: Room<AppState> | null;
}

export const ColyseusContext = createContext<ColyseusContextProps>({
  client: null,
  appRoom: null,
});

interface ColyseusProviderProps {
  children: React.ReactNode;
}

const ColyseusProvider = ({ children }: ColyseusProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [appRoom, setAppRoom] = useState<Room<AppState> | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const connect = async () => {
    const user = await getCurrentUser();
    if (user) {
      const updatedUser = {
        lastOnline: 'now',
      };
      const patchedUser = await patchCurrentUser(updatedUser);
      setUser(patchedUser);
    } else {
      console.log('no user found');
    }
    const userData = user ?? { username: 'guest', userNo: String(Math.floor(Math.random() * 10000)).padStart(4, '0') };
    const client = new Client(`${WS_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`);
    try {
      const appRoom: Room<AppState> = await client.joinOrCreate('app_room', userData);
      setClient(client);
      setAppRoom(appRoom);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!client && !appRoom && !user) {
        connect();
      }
    }
    fetchData();

    return () => {
      if (appRoom) {
        appRoom.leave();
      }
      async function fetchData() {
        // TODO : make it so that it only updates the lastOnline if the user is not already online in the AppRoom
        if (user) {
          const updatedUser = {
            lastOnline: new Date(),
          };

          patchCurrentUser(updatedUser);
        }
      }
      fetchData();
    };
  }, []);

  const contextValue = useMemo(() => ({ client, appRoom: appRoom, user: user }), [client, appRoom]);
  return <ColyseusContext.Provider value={contextValue}>{children}</ColyseusContext.Provider>;
};

export default ColyseusProvider;
