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
import reducers from './your-reducers';

const compare = initial => (previous, current) => (
    current && !current.equals(initial) ?
    current :
    previous
);
const reducer = reducerChain(compare, reducers);

// reducer(state, action) => ...
 * ```
 * @example
 * You also can curry your custom compare:
 * ```js
import reducerChain from 'reducer-chain';
import reducers from './your-reducers';

const compare = initial => (previous, current) => (
    current && !current.equals(initial) ?
    current :
    previous
);
const customReducerChain = reducerChain(compare);
const reducer = customReducerChain(reducers);

// reducer(state, action) => ...
 * ```
 * @param {Function} [predicate] Custom predicate function.
 * @param {Array.<Function>} reducers List of reducers to chain.
 * Signature: (initial, current) => state.
 * @return {Function} Reducer signature function.
 */
const chain = (predicate, reducers) => (state, action) => R.reduce(
    predicate(state), state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);

const safeChain = (predicate, reducers) => chain(
    _predicate.gets(predicate),
    _reducer.gets(reducers)
);

const withSingleArg = R.cond([
    [_predicate.is, R.curry(safeChain)],
    [_reducer.are, R.curry(safeChain)(null)],
    [R.T, safeChain],
]);

const curryChain = (arg1, arg2) => R.cond([
    [R.isNil, R.always(withSingleArg(arg1))],
    [R.T, R.curry(safeChain)(arg1)]
])(arg2);

exports = module.exports = curryChain;
