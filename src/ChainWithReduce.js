'use strict';

/**
 * @alias module:reducer-chain
 */
const R = require('ramda');
const _reducer = require('./reducer');
const _predicate = require('./predicate');

/**
 * @example
 * ```js
import reducerChain from 'reducer-chain';
import { reducer1, reducer2, reducer3 } from './your-reducers';

const reducer = (state, action) => {
    if (!state) state = initialState;
    return reducerChain([
        reducer1,
        reducer2,
        reducer3,
    ])(state, action);
};
 * ```
 * @example
 * Using custom compare function:
 * ```js
import reducerChain from 'reducer-chain';
import * as reducers from './your-reducers';

const compare = (initial, current) => (current && !current.equals(initial) ? current : initial);
const reducer = reducerChain(reducers, compare);

// reducer(state, action) => ...
 * ```
 * @example
 * You also can curry your custom compare:
 * ```js
import reducerChain from 'reducer-chain';
import * as reducers from './your-reducers';

const compare = (initial, current) => (current && !current.equals(initial) ? current : initial);
const customReducerChain = reducerChain(compare);
const reducer = customReducerChain(reducers);

// reducer(state, action) => ...
 * ```
 * @param {Array.<Function>} reducers List of reducers to chain.
 * @param {Function} [predicate] Custom predicate function.
 * Signature: (initial, current) => state.
 * @return {Function} Reducer signature function. State must not be null.
 */
const chain = (reducers, predicate) => (state, action) => R.reduce(
    predicate, state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);

const safeChain = (reducers, predicate) => chain(
    _reducer.gets(reducers),
    _predicate.gets(predicate)
);

const curryChain = (arg1, arg2) => R.cond([
    [_predicate.is, predicate => R.curry(safeChain)(R.__, predicate)],
    [R.T, R.curry(safeChain)(R.__, arg2)],
])(arg1);

exports = module.exports = curryChain;
