/**
 * @module reducer-sandbox
 * @version 1.0.0
 * @example
 * Import `ES5`
 * ```js
const reducerSandbox = require('reducer-sandbox');
 * ```
 * Import `ES6`
 * ```js
import reducerSandbox from 'reducer-sandbox';
 * ```
 * @example
 * ```js
const sandbox = reducerSandbox(reducer);
// sandbox.reducer => is your actual sandboxed reducer
// sandbox.dispatcher => is a function to call with store as first argument, to get sandboxed dispatch function
 * ```
 */
exports = module.exports = require('./Sandbox');
