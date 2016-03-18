import R from 'ramda';

/**
 * Check if given argument is a Reducer.
 *
 *    isReducer((state, action) => state) //=> true
 *    isReducer(state => state) //=> true
 *    isReducer(null) //=> false
 *
 */
export const isReducer = R.is(Function);

const isNotEmptyArray = R.pipe(R.length, R.gte(R.__, 1));

const isArrayOfReducers = R.both(
    isNotEmptyArray,
    R.pipe(R.reject(isReducer), R.length, R.equals(0))
);

/**
 * Check if given Object or Array only contain Reducers.
 *
 *    areReducers([
 *        (state, action) => state.set('ok', 1)),
 *        state => state.set('ok', true),
 *    ]) //=> true
 *    areReducers({
 *        reducer1: (state, action) => state.set('ok', 1)),
 *        reducer2: state => state.set('ok', true),
 *    ]) //=> true
 *    areReducers([
 *        (state, action) => state.set('ok', 1)),
 *        null,
 *    ]) //=> false
 *    areReducers({
 *        reducer1: (state, action) => state.set('ok', 1)),
 *        reducer2: null,
 *    ]) //=> false
 *
 */
export const areReducers = R.cond([
    [R.is(Array), isArrayOfReducers],
    [R.is(Object), R.pipe(R.values, isArrayOfReducers)],
    [R.T, R.always(false)],
]);

/**
 * Return Array of reducers from given Object or Array.
 *
 *    getReducers([
 *        (state, action) => state.set('ok', 1)),
 *        state => state.set('ok', true),
 *    ]) //=> [Function, Function]
 *    getReducers({
 *        reducer1: (state, action) => state.set('ok', 1)),
 *        reducer2: state => state.set('ok', true),
 *    ]) //=> [Function, Function]
 *    getReducers([
 *        (state, action) => state.set('ok', 1)),
 *        null,
 *    ]) //=> []
 *    getReducers({
 *        reducer1: (state, action) => state.set('ok', 1)),
 *        reducer2: null,
 *    ]) //=> []
 *
 */
export const getReducers = R.ifElse(
    areReducers,
    R.values,
    R.compose(R.empty, R.of)
);

export default {
    isReducer,
    areReducers,
    getReducers,
};
