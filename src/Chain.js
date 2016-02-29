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

const chainCompare = (reducers, predicate) => (state, action) => (
    R.reducer(predicate, state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    ))
);

const defaultPredicate = (a, b) => a;

const chainCheck = (reducers, predicate) => (
    chainCompare(
        R.ifElse(
            R.is(Array),
            R.identity,
            R.of
        )(reducers),
        R.ifElse(
            R.is(Function),
            R.identity,
            defaultPredicate
        )(predicate)
    )
);

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

// need to change the predicate to be (initial, state) => newState instead of filter predicate.
const chainWithReduce = (reducers, compare) => (state, action) => (
    R.reduce(R.cond([
        [R.is(Function), R.always],
        [R.T, R.always((initial, current) => (R.ifElse(
            R.both(
                R.compose(R.not, R.isNil),
                R.compose(R.not, R.equals(initial))
            )(current),
            current,
            initial
        )))],
    ])(compare), state, R.chain(
        reducer => R.of(reducer(state, action)),
        getOREmptyList(reducers)
    ))
);

exports = module.exports = chain;
