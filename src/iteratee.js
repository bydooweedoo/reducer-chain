import R from 'ramda';
import { withInitial } from './compare';

export const defaultIteratee = withInitial;

/**
 * Check if given argument is an Iteratee.
 *
 *    isIteratee(initial => (previous, current) => current) //=> true
 *    isIteratee((arg1, arg2) => true) //=> true
 *    isIteratee(null) //=> false
 *
 */
export const isIteratee = R.is(Function);

/**
 * Returns default iteratee if given argument is not a valid iteratee else
 * returns given iteratee.
 *
 *    getIterateeOrUseDefault(
 *        initial => (previous, current) => current
 *    ) //=> initial => (previous, current) => current
 *    getIterateeOrUseDefault((arg1, arg2) => true) //=> (arg1, arg2) => true
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
