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
import * as compare from './compare';

/**
 * Calls each reducers from list with given state and action and then
 * reduce returned state using given iteratee.
 *
 *      const compare = initialState => (previousState, currentState) => (
 *          currentState === null ? previousState : currentState
 *      );
 *      const initialState = {updated: false};
 *      const action = {type: 'ACTION_NAME'};
 *      const updatedState = {updated: true};
 *      const reducer1 = (state, action) => null;
 *      const reducer2 = (state, action) => updatedState;
 *      const reducers1 = chain(compare, [reducer1, reducer2]);
 *      const reducers2 = chain(compare, [reducer1]);
 *      const reducers3 = chain(compare, []);
 *
 *      reducers1(initialState, action); //=> updatedState
 *      reducers2(initialState, action); //=> initialState
 *      reducers3(initialState, action); //=> initialState
 */
const chain = (iteratee, reducers) => (state, action) => R.reduce(
    iteratee(state), state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);

const safeChain = R.converge(chain, [
    R.pipe(R.nthArg(0), getIterateeOrUseDefault),
    R.pipe(R.nthArg(1), getReducers),
]);

const safeChainCurried = R.curryN(2, safeChain);

const withSingleArg = R.cond([
    [isIteratee, safeChainCurried],
    [areReducers, safeChainCurried(null)],
    [R.T, safeChain],
]);

const curriedChain = R.unapply(
    R.cond([
        [R.pipe(R.length, R.equals(1)), R.pipe(R.head, withSingleArg)],
        [R.T, R.apply(safeChain)],
    ])
);

curriedChain.compare = compare;

export default curriedChain;
