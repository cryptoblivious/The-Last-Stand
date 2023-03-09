'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./Room.ext.js');
var core = require('@colyseus/core');
var arena = require('@colyseus/arena');
var TestServer = require('./TestServer.js');

const DEFAULT_TEST_PORT = 2568;
async function boot(config, port = DEFAULT_TEST_PORT) {
    if (config instanceof core.Server) {
        const gameServer = config;
        await gameServer.listen(DEFAULT_TEST_PORT);
        return new TestServer.ColyseusTestServer(gameServer);
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
        const gameServer = await arena.listen({ ...config, displayLogs: false, }, port);
        return new TestServer.ColyseusTestServer(gameServer);
    }
}

exports.ColyseusTestServer = TestServer.ColyseusTestServer;
exports.boot = boot;
//# sourceMappingURL=index.js.map
