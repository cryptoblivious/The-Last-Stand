import React, { createContext, useState, useEffect } from 'react';
import { Room, Client } from 'colyseus.js';

interface ColyseusContextProps {
  client: Client | null;
  globalRoom: any | null; // Replace any with the actual type of your game room state
}

const ColyseusContext = createContext<ColyseusContextProps>({
  client: null,
  globalRoom: null,
});

interface ColyseusProviderProps {
  children: React.ReactNode;
}

const ColyseusProvider = ({ children }: ColyseusProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [globalRoom, setGlobalRoom] = useState<Room | null>(null);

  useEffect(() => {
    const connect = async () => {
      const client = new Client('ws://localhost:80');
      const room = await client.join('global_room');

      setClient(client);
      setGlobalRoom(room);

      console.log('client : ', client, 'room : ', room);
    };

    connect();

    return () => {
      if (globalRoom) {
        globalRoom.leave();
      }
    };
  }, [globalRoom, client]);

  if (!globalRoom) {
    return <div>Loading...</div>;
  }

  return <ColyseusContext.Provider value={{ client, globalRoom }}>{children}</ColyseusContext.Provider>;
};

export default ColyseusProvider;
