import R from 'ramda';
import expect from 'expect';
import iteratee from '../iteratee';

describe('iteratee', () => {

    describe('#isIteratee', () => {

        it('should be a property function', () => {
            expect(iteratee.isIteratee).toBeA(Function);
        });

        it('should return true if given arg is an Iteratee', () => {
            expect(iteratee.isIteratee(initial => (previous, current) => current)).toEqual(true);
        });

        it('should return false if given arg is not an Iteratee', () => {
            expect(iteratee.isIteratee([() => true])).toEqual(false);
            expect(iteratee.isIteratee({})).toEqual(false);
            expect(iteratee.isIteratee(null)).toEqual(false);
            expect(iteratee.isIteratee(1)).toEqual(false);
            expect(iteratee.isIteratee(false)).toEqual(false);
            expect(iteratee.isIteratee('1')).toEqual(false);
        });

    });

    describe('#defaultIteratee', () => {

        it('should be a property function', () => {
            expect(iteratee.defaultIteratee).toBeA(Function);
        });

        it('should take initial state and return a reduce iteratee', () => {
            expect(iteratee.defaultIteratee(null)).toBeA(Function);
        });

        it('should returns previous state if current if nil', () => {
            const initialState = {test: true};
            const previousState = {test: false};
            const f = iteratee.defaultIteratee(initialState);

            expect(f(previousState, null)).toBe(previousState);
        });

        it('should returns current state if current is not nil and differs from initial state', () => {
            const initialState = {test: true};
            const currentState = {test: false};
            const f = iteratee.defaultIteratee(initialState);

            expect(f(null, currentState)).toBe(currentState);
        });

        it('should returns previous state if current is not nil but equals to initial state', () => {
            const initialState = {test: true};
            const previousState = {test: false};
            const currentState = initialState;
            const f = iteratee.defaultIteratee(initialState);

            expect(f(previousState, currentState)).toBe(previousState);
        });

    });

    describe('#getIterateeOrUseDefault', () => {

        it('should be a property function', () => {
            expect(iteratee.getIterateeOrUseDefault).toBeA(Function);
        });

        it('should returns given argument if it is a valid iteratee', () => {
            const validIteratee = initial => (current, previous) => initial;

            expect(iteratee.getIterateeOrUseDefault(validIteratee)).toBe(validIteratee);
        });

        it('should returns default iteratee if given argument is not a valid iteratee', () => {
            expect(iteratee.getIterateeOrUseDefault(null)).toBe(iteratee.defaultIteratee);
        });

    });

});
