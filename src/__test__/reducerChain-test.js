import R from 'ramda';
import Immutable from 'immutable';
import expect from 'expect';
import reducerChain from '..';

describe('reducer-chain', () => {

    const action = {type: 'TEST'};
    const state = Immutable.Map({
        a: true,
        b: 0,
    });
    const state1 = state.set('b', 1);
    const state2 = state.set('b', 2);
    const state3 = state.set('b', 3);

    it('should returns given state if empty list of reducer given', () => {
        const reducer = reducerChain([]);

        expect(reducer(state, action)).toBe(state);
    });

    it('should returns given state if no array given', () => {
        const reducer = reducerChain(null);

        expect(reducer(state, action)).toBe(state);
    });

    it('should call all reducers once', () => {
        const spy1 = expect.createSpy().andReturn(null);
        const spy2 = expect.createSpy().andReturn(null);
        const spy3 = expect.createSpy().andReturn(null);
        const reducer = reducerChain([spy1, spy2, spy3]);

        reducer(state, action);
        expect(spy1).toHaveBeenCalled();
        expect(spy1.calls.length).toEqual(1);
        expect(spy2).toHaveBeenCalled();
        expect(spy2.calls.length).toEqual(1);
        expect(spy3).toHaveBeenCalled();
        expect(spy3.calls.length).toEqual(1);
    });

    it('should call all reducers with same given state and action', () => {
        const spy1 = expect.createSpy().andReturn(null);
        const spy2 = expect.createSpy().andReturn(null);
        const spy3 = expect.createSpy().andReturn(null);
        const reducer = reducerChain([spy1, spy2, spy3]);

        reducer(state, action);
        expect(spy1).toHaveBeenCalled();
        expect(spy1).toHaveBeenCalledWith(state, action);
        expect(spy2).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledWith(state, action);
        expect(spy3).toHaveBeenCalled();
        expect(spy3).toHaveBeenCalledWith(state, action);
    });

    it('should returns last reducer result that does not equals given state', () => {
        const spy1 = expect.createSpy().andReturn(state1);
        const spy2 = expect.createSpy().andReturn(state2);
        const spy3 = expect.createSpy().andReturn(state3);
        const reducer = reducerChain([spy1, spy2, spy3]);

        expect(reducer(state, action)).toBe(state3);
    });

    it('should returns given state if all reducers returns null', () => {
        const spy1 = expect.createSpy().andReturn(null);
        const spy2 = expect.createSpy().andReturn(null);
        const spy3 = expect.createSpy().andReturn(null);
        const reducer = reducerChain([spy1, spy2, spy3]);

        expect(reducer(state, action)).toBe(state);
    });

    it('should returns only non null state', () => {
        const spy1 = expect.createSpy().andReturn(null);
        const spy2 = expect.createSpy().andReturn(state2);
        const spy3 = expect.createSpy().andReturn(null);
        const reducer = reducerChain([spy1, spy2, spy3]);

        expect(reducer(state, action)).toBe(state2);
    });

    describe('#compare', () => {

        describe('custom - reducerChain(customCompare, reducers)', () => {

            let spy1;
            let spy2;
            let spy3;
            let iteratee;
            let compare;

            beforeEach(() => {
                spy1 = expect.createSpy().andReturn(state1);
                spy2 = expect.createSpy().andReturn(state2);
                spy3 = expect.createSpy().andReturn(state3);
                iteratee = expect.createSpy().andReturn(state);
                compare = expect.createSpy().andReturn(iteratee);
            });

            it('should use given compare instead of default', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(compare).toHaveBeenCalled();
            });

            it('should call given compare once with given state', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(compare.calls.length).toEqual(1);
                expect(compare).toHaveBeenCalledWith(state);
            });

            it('should call returned iteratee once for each reducer', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee.calls.length).toEqual(3);
            });

            it('should call returned iteratee with initial state and state1 first', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state1);
                expect(iteratee.calls[0].arguments).toEqual([state, state1]);
            });

            it('should call returned iteratee with returned state and state2 second', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state2);
                expect(iteratee.calls[1].arguments).toEqual([state, state2]);
            });

            it('should call returned iteratee with returned state and state3 third', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state3);
                expect(iteratee.calls[2].arguments).toEqual([state, state3]);
            });

            it('should call returned iteratee with previous and current state', () => {
                const reducer = reducerChain(compare, [spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state1);
                expect(iteratee).toHaveBeenCalledWith(state, state2);
                expect(iteratee).toHaveBeenCalledWith(state, state3);
            });

        });

        describe('curry - reducerChain(customCompare)(reducers)', () => {

            let spy1;
            let spy2;
            let spy3;
            let iteratee;
            let compare;
            let customChain;

            beforeEach(() => {
                spy1 = expect.createSpy().andReturn(state1);
                spy2 = expect.createSpy().andReturn(state2);
                spy3 = expect.createSpy().andReturn(state3);
                iteratee = expect.createSpy().andReturn(state);
                compare = expect.createSpy().andReturn(iteratee);
                customChain = reducerChain(compare);
            });

            it('should return curried function if only compare given', () => {
                expect(customChain).toBeA(Function);
            });

            it('should return high order reducer when pass reducers to curried function', () => {
                expect(customChain([spy1, spy2, spy3])).toBeA(Function);
            });

            it('should called curried function with previously given compare', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(compare).toHaveBeenCalled();
            });

            it('should called given compare with given state once', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(compare.calls.length).toEqual(1);
                expect(compare).toHaveBeenCalledWith(state);
            });

            it('should call returned iteratee once for each reducer', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee.calls.length).toEqual(3);
            });

            it('should call returned iteratee with initial state and state1 first', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state1);
                expect(iteratee.calls[0].arguments).toEqual([state, state1]);
            });

            it('should call returned iteratee with returned state and state2 second', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state2);
                expect(iteratee.calls[1].arguments).toEqual([state, state2]);
            });

            it('should call returned iteratee with returned state and state3 third', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state3);
                expect(iteratee.calls[2].arguments).toEqual([state, state3]);
            });

            it('should call returned iteratee with previous and current state', () => {
                const reducer = customChain([spy1, spy2, spy3]);

                reducer(state, action);
                expect(iteratee).toHaveBeenCalledWith(state, state1);
                expect(iteratee).toHaveBeenCalledWith(state, state2);
                expect(iteratee).toHaveBeenCalledWith(state, state3);
            });

        });

    });

});
