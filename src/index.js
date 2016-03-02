/**
 * @module reducer-chain
 * @version 1.0.0
 * @example
 * Import `ES5`
 * ```js
const reducerChain = require('reducer-chain');
 * ```
 * Import `ES6`
 * ```js
import reducerChain from 'reducer-chain';
 * ```
 * @example
 * ```js
const chainedReducer = reducerChain([reducer1, reducer2, reducer3]);
// chainedReducer(state, action) => will call all reducers with given state and action and take the first non null different one.
 * ```
 * @example
 * Sample code:
 * ```js
// Chain takes 2 arguments:
//    1. The reducer iteratee callback
//    2. The list of reducers.
// Then it returns a high order reducer that will call each given reducers and return the proper state.
//
// The iteratee callback will firstly be called with the given state.
// Then the iteratee callback will return the reduce iteratee function which takes
// the previous and current state.
// Finally the iteratee will have to return the proper state at each call.
const chain = (iteratee, reducers) => (state, action) => R.reduce(
    iteratee(state), state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);
 * ```
 */
exports = module.exports = require('./ChainWithReduce');
