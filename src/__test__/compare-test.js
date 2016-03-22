import R from 'ramda';
import expect from 'expect';
import * as compare from '../compare';

describe('compare', () => {

    describe('#withPrevious', () => {

        it('should be a property function', () => {
            expect(compare.withPrevious).toBeA(Function);
        });

        it('should return previous if current is nil', () => {
            const iteratee = compare.withPrevious({initial: true});
            const previous = {previous: true};
            const current = null;

            expect(iteratee(previous, null)).toBe(previous);
            expect(iteratee(previous, undefined)).toBe(previous);
        });

        it('should return current if not nil and not equals previous', () => {
            const iteratee = compare.withPrevious({initial: true});
            const previous = {previous: true};
            const current = {current: true};

            expect(iteratee(previous, current)).toBe(current);
        });

        it('should return previous if current equals', () => {
            const iteratee = compare.withPrevious({initial: true});
            const previous = {previous: true};
            const current = previous;

            expect(iteratee(previous, current)).toBe(previous);
        });

    });

    describe('#withInitial', () => {

        it('should be a property function', () => {
            expect(compare.withInitial).toBeA(Function);
        });

        it('should return previous if current is nil', () => {
            const iteratee = compare.withInitial({initial: true});
            const previous = {previous: true};
            const current = null;

            expect(iteratee(previous, null)).toBe(previous);
            expect(iteratee(previous, undefined)).toBe(previous);
        });

        it('should return current if not nil and not equals initial', () => {
            const iteratee = compare.withInitial({initial: true});
            const previous = {previous: true};
            const current = {current: true};

            expect(iteratee(previous, current)).toBe(current);
        });

        it('should return previous if current equals initial', () => {
            const initial = {initial: true};
            const iteratee = compare.withInitial(initial);
            const previous = {previous: true};
            const current = initial;

            expect(iteratee(previous, current)).toBe(previous);
        });

    });

    describe('#withPreviousCustomEquals', () => {

        it('should be a property function', () => {
            expect(compare.withPreviousCustomEquals).toBeA(Function);
        });

        it('should use given equals once', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withPreviousCustomEquals(equals)(initial);

            iteratee(previous, current);
            expect(equals).toHaveBeenCalled();
            expect(equals.calls.length).toEqual(1);
        });

        it('should call equals with previous and current', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withPreviousCustomEquals(equals)(initial);

            iteratee(previous, current);
            expect(equals).toHaveBeenCalledWith(previous, current);
        });

        it('should returns previous if equals returns true', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withPreviousCustomEquals(equals)(initial);

            expect(iteratee(previous, current)).toBe(previous);
        });

        it('should returns current if equals returns false', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(false);
            const iteratee = compare.withPreviousCustomEquals(equals)(initial);

            expect(iteratee(previous, current)).toBe(current);
        });

    });

    describe('#withInitialCustomEquals', () => {

        it('should be a property function', () => {
            expect(compare.withInitialCustomEquals).toBeA(Function);
        });

        it('should use given equals once', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withInitialCustomEquals(equals)(initial);

            iteratee(previous, current);
            expect(equals).toHaveBeenCalled();
            expect(equals.calls.length).toEqual(1);
        });

        it('should call equals with initial and current', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withInitialCustomEquals(equals)(initial);

            iteratee(previous, current);
            expect(equals).toHaveBeenCalledWith(initial, current);
        });

        it('should returns previous if equals returns true', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(true);
            const iteratee = compare.withInitialCustomEquals(equals)(initial);

            expect(iteratee(previous, current)).toBe(previous);
        });

        it('should returns current if equals returns false', () => {
            const initial = {initial: true};
            const previous = {previous: true};
            const current = {current: true};
            const equals = expect.createSpy().andReturn(false);
            const iteratee = compare.withInitialCustomEquals(equals)(initial);

            expect(iteratee(previous, current)).toBe(current);
        });

    });

});
