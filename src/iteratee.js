import R from 'ramda';

export const defaultIteratee = initial => (previous, current) => R.ifElse(
    R.both(
        R.compose(R.not, R.isNil),
        R.compose(R.not, R.equals(initial))
    ),
    R.identity,
    R.always(initial)
)(current);

/**
 * Check if given argument is an Iteratee.
 *
 *    isIteratee(initial => (previous, current) => current) //=> true
 *    isIteratee((arg1, arg2) => true) //=> false
 *    isIteratee(null) //=> false
 *
 */
export const isIteratee = R.both(
    R.is(Function),
    R.pipe(R.length, R.equals(1))
);

/**
 * Returns default iteratee if given argument is not a valid iteratee else
 * returns given iteratee.
 *
 *    getIterateeOrUseDefault(
 *        initial => (previous, current) => current
 *    ) //=> initial => (previous, current) => current
 *    getIterateeOrUseDefault((arg1, arg2) => true) //=> defaultIteratee
 *    getIterateeOrUseDefault(null) //=> defaultIteratee
 *
 */
export const getIterateeOrUseDefault = R.ifElse(
    isIteratee,
    R.identity,
    R.always(defaultIteratee)
);

export default {
    defaultIteratee,
    isIteratee,
    getIterateeOrUseDefault,
};
