/**
 * @module reducer-chain
 */

import R from 'ramda';
import {
    areReducers,
    getReducers,
} from './reducer';
import {
    isIteratee,
    defaultIteratee,
    getIterateeOrUseDefault,
} from './iteratee';

/**
 * @callback Reducer
 * @param {any} state The state of your application.
 * @param {Object} action Action.
 * @return {any} Updated state.
 */

/**
 * @callback Iteratee
 * @param {any} previousState Previous state. Defaults to the initial state (reduce accumulator).
 * @param {any} currentState Current state.
 * @return {any} State to keep.
 */

/**
 * @callback IterateeInit
 * @param {any} initialState The state given to the high order reducer.
 * @return {Iteratee} Iterator function for reduce.
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
 * @param {IterateeInit} [iteratee] Custom iteratee init function.
 * @param {Array.<Reducer>} reducers List of reducers to chain.
 * @return {Reducer} High order reducer chaining given reducers list.
 */
const chain = (iteratee, reducers) => (state, action) => R.reduce(
    iteratee(state), state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);

const safeChain = (iteratee, reducers) => chain(
    getIterateeOrUseDefault(iteratee),
    getReducers(reducers)
);

const withSingleArg = R.cond([
    [isIteratee, R.curry(safeChain)],
    [areReducers, R.curry(safeChain)(null)],
    [R.T, safeChain],
]);

const curriedChain = (arg1, arg2) => R.cond([
    [R.isNil, R.always(withSingleArg(arg1))],
    [R.T, R.curry(safeChain)(arg1)],
])(arg2);

curriedChain.curried = curriedChain;
curriedChain.single = withSingleArg;
curriedChain.safe = safeChain;
curriedChain.unsafe = chain;
curriedChain.defaultIteratee = defaultIteratee;

export default curriedChain;
