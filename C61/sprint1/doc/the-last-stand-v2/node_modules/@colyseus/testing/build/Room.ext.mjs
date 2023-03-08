import { Room, Deferred } from '@colyseus/core';
import { Room as Room$1 } from 'colyseus.js';

/**
 * Room.ts augmentations
 * Monkey-patches some Room methods to improve the testing experience.
 */
/*
 * Wait until receive message
 */
const _originalOnMessage = Room.prototype['_onMessage'];
Room.prototype['_onMessage'] = function () {
    _originalOnMessage.apply(this, arguments);
    if (this._waitingForMessage) {
        setTimeout(() => this._waitingForMessage[1].resolve(), this._waitingForMessage[0]);
    }
};
Room.prototype.waitForNextMessage = async function (additionalDelay = 0) {
    this._waitingForMessage = [additionalDelay, new Deferred()];
    return this._waitingForMessage[1];
};
Room.prototype.waitForMessage = async function (type, rejectTimeout = 3000) {
    const originalMessageHandler = this['onMessageHandlers'][type] || (() => { });
    const room = this;
    return new Promise((resolve, reject) => {
        const rejectionTimeout = setTimeout(() => reject(new Error(`message '${type}' was not called. timed out (${rejectTimeout}ms)`)), rejectTimeout);
        room['onMessageHandlers'][type] = async function (client, message) {
            // clear rejection timeout
            clearTimeout(rejectionTimeout);
            // call original handler
            await originalMessageHandler.apply(room, arguments);
            // revert to original message handler
            room['onMessageHandlers'][type] = originalMessageHandler;
            // resolves waitForMessage promise.
            resolve([client, message]);
        };
    });
};
/**
 * Wait next simulation tick
 */
Room.prototype.waitForNextSimulationTick = async function () {
    if (this['_simulationInterval']) {
        const milliseconds = this['_simulationInterval']['_idleTimeout'];
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
        // return timers.setTimeout(milliseconds);
    }
    else {
        console.warn("⚠️ waitForSimulation() - .setSimulationInterval() is a must.");
        return Promise.resolve();
    }
};
/**
 * Wait for next patch
 */
const _originalBroadcastPatch = Room.prototype['broadcastPatch'];
Room.prototype['broadcastPatch'] = function () {
    const retVal = _originalBroadcastPatch.apply(this, arguments);
    if (this._waitingForPatch) {
        setTimeout(() => this._waitingForPatch[1].resolve(), this._waitingForPatch[0]);
    }
    return retVal;
};
Room.prototype.waitForNextPatch = async function (additionalDelay = 0) {
    this._waitingForPatch = [additionalDelay, new Deferred()];
    return this._waitingForPatch[1];
};
Room$1.prototype.waitForMessage = async function (type, rejectTimeout = 3000) {
    return new Promise((resolve, reject) => {
        const received = (message) => {
            unbind();
            resolve(message);
            clearTimeout(rejectionTimeout);
        };
        const unbind = this['onMessageHandlers'].on(type, (message) => received(message));
        const rejectionTimeout = setTimeout(() => {
            unbind();
            reject(new Error(`message '${type}' was not called. timed out (${rejectTimeout}ms)`));
        }, rejectTimeout);
    });
};
const _originalClientOnMessage = Room$1.prototype['dispatchMessage'];
Room$1.prototype['dispatchMessage'] = function () {
    _originalClientOnMessage.apply(this, arguments);
    if (this._waitingForMessage) {
        setTimeout(() => {
            this._waitingForMessage[1].resolve([arguments[0], arguments[1]]);
        }, this._waitingForMessage[0]);
    }
};
Room$1.prototype.waitForNextMessage = async function (additionalDelay = 0) {
    this._waitingForMessage = [additionalDelay, new Deferred()];
    return this._waitingForMessage[1];
};
const _originalClientPatch = Room$1.prototype['patch'];
Room$1.prototype['patch'] = function () {
    _originalClientPatch.apply(this, arguments);
    if (this._waitingForPatch) {
        setTimeout(() => {
            this._waitingForPatch[1].resolve([arguments[0], arguments[1]]);
        }, this._waitingForPatch[0]);
    }
};
Room$1.prototype.waitForNextPatch = async function (additionalDelay = 0) {
    this._waitingForPatch = [additionalDelay, new Deferred()];
    return this._waitingForPatch[1];
};
//# sourceMappingURL=Room.ext.mjs.map
