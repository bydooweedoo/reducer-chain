import R from 'ramda';

const currentIsNotNil = R.compose(R.not, R.isNil, R.last);

const getPrevious = R.head;

const getCurrent = R.last;

const currentNotEquals = (state, equals) => R.pipe(
    getCurrent, R.of,
    R.prepend(state),
    R.apply(equals), R.not
);

/**
 * Compare current state with initial using given `equals` function.
 * It returns previous state if current is null or equals initial state,
 * else returns current state.
 *
 *      const initialState = Immutable.Map({initial: true});
 *      const currentState = Immutable.Map({current: true});
 *      const previousState = Immutable.Map({previous: true});
 *      const equals = Immutable.is;
 *      const iteratee = reducerChain.compare.withInitialCustomEquals(equals)(initialState);
 *
 *      iteratee(previousState, null); //=> previousState
 *      iteratee(previousState, initialState); //=> previousState
 *      iteratee(previousState, currentState); //=> currentState
 */
export const withInitialCustomEquals = equals => initial => R.unapply(
    R.cond([
        [R.both(
            currentIsNotNil,
            currentNotEquals(initial, equals)
        ), getCurrent],
        [R.T, getPrevious],
    ])
);

/**
 * Compare current state with previous using given `equals` function.
 * It returns previous state if current is null or equals previous state,
 * else returns current state.
 *
 *      const initialState = Immutable.Map({initial: true});
 *      const currentState = Immutable.Map({current: true});
 *      const previousState = Immutable.Map({previous: true});
 *      const equals = Immutable.is;
 *      const iteratee = reducerChain.compare.withPreviousCustomEquals(equals)(initialState);
 *
 *      iteratee(previousState, null); //=> previousState
 *      iteratee(previousState, initialState); //=> initialState
 *      iteratee(previousState, currentState); //=> currentState
 */
export const withPreviousCustomEquals = equals => initial => R.unapply(
    R.cond([
        [R.both(
            currentIsNotNil,
            R.compose(R.not, R.apply(equals))
        ), getCurrent],
        [R.T, getPrevious],
    ])
);

/**
 * Compare current state with initial. It returns previous state if current
 * is null or equals initial state, else returns current state.
 *
 *      const initialState = {initial: true};
 *      const currentState = {current: true};
 *      const previousState = {previous: true};
 *      const iteratee = reducerChain.compare.withInitial(initialState);
 *
 *      iteratee(previousState, null); //=> previousState
 *      iteratee(previousState, initialState); //=> previousState
 *      iteratee(previousState, currentState); //=> currentState
 */
export const withInitial = withInitialCustomEquals(R.equals);

/**
 * Compare current state with previous. It returns previous state if current
 * is null or equals previous state, else returns current state.
 *
 *      const initialState = {initial: true};
 *      const currentState = {current: true};
 *      const previousState = {previous: true};
 *      const iteratee = reducerChain.compare.withPrevious(initialState);
 *
 *      iteratee(previousState, null); //=> previousState
 *      iteratee(previousState, initialState); //=> initialState
 *      iteratee(previousState, currentState); //=> currentState
 */
export const withPrevious = withPreviousCustomEquals(R.equals);
