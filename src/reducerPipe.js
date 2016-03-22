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

const safePipe = R.converge(pipe, [
    R.pipe(R.nthArg(0), getIterateeOrUseDefault),
    R.pipe(R.nthArg(1), getReducers),
]);

const safePipeCurried = R.curryN(2, safePipe);

// const safePipe = (iteratee, reducers) => pipe(
//     getIterateeOrUseDefault(iteratee),
//     getReducers(reducers)
// );

const withSingleArg = R.cond([
    [isIteratee, safePipeCurried],
    [areReducers, safePipeCurried(null)],
    [R.T, safePipe],
]);

const curriedPipe = (arg1, arg2) => R.cond([
    [R.isNil, R.always(withSingleArg(arg1))],
    [R.T, R.curry(safePipe)(arg1)],
])(arg2);

curriedPipe.compare = compare;

export default curriedPipe;
