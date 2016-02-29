/**
 * @module reducer-chain
 * @version 1.0.0
 * @example
 * Import `ES5`
 * ```js
const chain = require('reducer-chain');
 * ```
 * Import `ES6`
 * ```js
import chain from 'reducer-chain';
 * ```
 * @example
 * ```js
const chained = chain([reducer1, reducer2, reducer3]);
// chain(state, action) => will call all reducers with given state and action and take the first non null different one.
 * ```
 */
exports = module.exports = require('./Chain');
