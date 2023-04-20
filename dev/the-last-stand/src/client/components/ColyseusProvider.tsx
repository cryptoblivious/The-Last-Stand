import React, { createContext, useState, useEffect } from 'react';
import { Room, Client } from 'colyseus.js';
import { Outlet, useLocation } from 'react-router-dom';

interface ColyseusContextProps {
  client: Client | null;
  globalRoom: any | null; // Replace any with the actual type of your game room state
}

export const ColyseusContext = createContext<ColyseusContextProps>({
  client: null,
  globalRoom: null,
});

interface ColyseusProviderProps {
  children: React.ReactNode;
}

async function ColyseusProvider({ children }: ColyseusProviderProps) {
  const [client, setClient] = useState<Client | null>(null);
  const [globalRoom, setGlobalRoom] = useState<any | null>(null);

  useEffect(() => {
    const connect = async () => {
      const client = new Client('ws://localhost:2567');
      const room = await client.join('global_room');

      setClient(client);
      setGlobalRoom(room);

      console.log(client);
    };

    connect();

    return () => {
      if (globalRoom) {
        globalRoom.leave();
      }
      if (client) {
      }
    };
  }, [globalRoom, client]);

  if (!globalRoom) {
    return <div>Loading...</div>;
  }

  return <ColyseusContext.Provider value={{ client, globalRoom }}>{children}</ColyseusContext.Provider>;
}

export default ColyseusProvider;
