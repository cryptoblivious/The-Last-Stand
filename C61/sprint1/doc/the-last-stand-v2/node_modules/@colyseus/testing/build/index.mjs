import './Room.ext.mjs';
import { Server } from '@colyseus/core';
import { listen } from '@colyseus/arena';
import { ColyseusTestServer } from './TestServer.mjs';
export { ColyseusTestServer } from './TestServer.mjs';

const DEFAULT_TEST_PORT = 2568;
async function boot(config, port = DEFAULT_TEST_PORT) {
    if (config instanceof Server) {
        const gameServer = config;
        await gameServer.listen(DEFAULT_TEST_PORT);
        return new ColyseusTestServer(gameServer);
    }
    else {
        if (!config.options) {
            config.options = {};
        }
        // override server options for testing.
        config.options.gracefullyShutdown = false;
        // Force LocalDriver & LocalPresence ??
        // config.options.driver = new LocalDriver();
        // config.options.presence = new LocalPresence();
        const gameServer = await listen({ ...config, displayLogs: false, }, port);
        return new ColyseusTestServer(gameServer);
    }
}

export { boot };
//# sourceMappingURL=index.mjs.map
