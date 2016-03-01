'use strict';

/**
 * @alias module:reducer-chain
 */
const R = require('ramda');
const _reducer = require('./reducer');
const _predicate = require('./predicate');

/**
 * @callback Reducer
 * @param {any} state The state of your application.
 * @param {Object} action Action.
 * @return {any} Updated state.
 */

/**
 * @callback ReduceIterator
 * @param {any} previousState Previous state. Defaults to initial state.
 * @param {any} currentState Current state.
 * @return {any} State to keep.
 */

/**
 * @callback Predicate
 * @param {any} initialState The initial state of your application.
 * Actually, it is the state given to the high order reducer.
 * @return {ReduceIterator} Iterator function for reduce.
 */

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
 * @param {Predicate} [predicate] Custom predicate function.
 * @param {Array.<Reducer>} reducers List of reducers to chain.
 * @return {Reducer} High order reducer chaining given reducers list.
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

curryChain.curried = curryChain;
curryChain.single = withSingleArg;
curryChain.safe = safeChain;
curryChain.unsafe = chain;
curryChain.defaultPredicate = _predicate.base;

exports = module.exports = curryChain;
