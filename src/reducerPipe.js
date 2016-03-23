import R from 'ramda';
import {
    reducer as utilsReducer,
    iteratee as utilsIteratee,
    compare as utilsCompare,
} from 'reducer-utils';

const pipe = (iteratee, reducers) => (state, action) => {
    const compare = iteratee(state);

    return R.reduce((savedState, reducer) => compare(
        savedState, reducer(savedState, action)
    ), state, reducers);
};

const safePipe = R.converge(pipe, [
    R.pipe(R.nthArg(0), utilsIteratee.getIterateeOrUseDefault),
    R.pipe(R.nthArg(1), utilsReducer.getReducers),
]);

const safePipeCurried = R.curryN(2, safePipe);

const withSingleArg = R.cond([
    [utilsIteratee.isIteratee, safePipeCurried],
    [utilsReducer.areReducers, safePipeCurried(null)],
    [R.T, safePipe],
]);

const curriedPipe = (arg1, arg2) => R.cond([
    [R.isNil, R.always(withSingleArg(arg1))],
    [R.T, R.curry(safePipe)(arg1)],
])(arg2);

curriedPipe.compare = utilsCompare;

export default curriedPipe;
