import "./Room.ext";
import { Server } from "@colyseus/core";
import { ArenaOptions } from "@colyseus/arena";
import { ColyseusTestServer } from "./TestServer";
export declare function boot(config: ArenaOptions | Server, port?: number): Promise<ColyseusTestServer>;
export { ColyseusTestServer };
