'use strict';

/**
 * @alias module:reducer-chain
 */
const R = require('ramda');
const getOREmptyList = require('./utils/getOREmptyList');
const getCompare = state => (R.cond([
    [R.is(Function), f => f(state)],
    [R.T, R.always(R.both(
        R.compose(R.not, R.isNil),
        R.compose(R.not, R.equals(state))
    ))],
]));

/**
 * @example
 * ```js
import Chain from 'reducer-chain';

const reducer = (state, action) => {
    if (!state) state = initialState;
    return Chain([reducer1, reducer2, reducer3])(state, action);
};
 * ```
 * @param {Array.<Function>} reducers List of reducers to chain.
 * @param {Function} [predicate] Custom predicate function.
 * Signature: initial => state => Boolean (true to keep state false to keep initial).
 * @return {Function} Reducer signature function. State must not be null.
 */
const chain = (reducers, predicate) => (state, action) => (
    R.head(R.append(
        state,
        R.filter(getCompare(state)(predicate), R.chain(
            reducer => R.of(reducer(state, action)),
            getOREmptyList(reducers)
        ))
    ))
);

exports = module.exports = chain;
