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
import * as compare from './compare';

const pipe = (iteratee, reducers) => (state, action) => {
    const compare = iteratee(state);

    return R.reduce((savedState, reducer) => {
        return compare(savedState, reducer(savedState, action));
    }, state, reducers);
};

const safePipe = (iteratee, reducers) => pipe(
    getIterateeOrUseDefault(iteratee),
    getReducers(reducers)
);

const withSingleArg = R.cond([
    [isIteratee, R.curry(safePipe)],
    [areReducers, R.curry(safePipe)(null)],
    [R.T, safePipe],
]);

const curriedPipe = (arg1, arg2) => R.cond([
    [R.isNil, R.always(withSingleArg(arg1))],
    [R.T, R.curry(safePipe)(arg1)],
])(arg2);

curriedPipe.curried = curriedPipe;
curriedPipe.single = withSingleArg;
curriedPipe.safe = safePipe;
curriedPipe.unsafe = pipe;
curriedPipe.defaultIteratee = defaultIteratee;
curriedPipe.compare = compare;

export default curriedPipe;
