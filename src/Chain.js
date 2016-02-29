'use strict';

/**
 * @alias module:reducer-chain
 */
const R = require('ramda');
const getOREmptyList = require('./utils/getOREmptyList');

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
 * @param {Function} [compare] Custom compare function.
 * @return {Function} Reducer signature function. State must not be null.
 */
const chain = (reducers, compare) => (state, action) => (
    R.head(R.append(
        state,
        R.filter(R.cond([
            [R.is(Function), f => f(state)],
            [R.T, R.always(R.both(
                R.compose(R.not, R.isNil),
                R.compose(R.not, R.equals(state))
            ))],
        ])(compare), R.chain(
            reducer => R.of(reducer(state, action)),
            getOREmptyList(reducers)
        ))
    ))
);

exports = module.exports = chain;
