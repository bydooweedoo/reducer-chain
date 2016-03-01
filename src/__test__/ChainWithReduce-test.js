'use strict';

const R = require('ramda');
const Immutable = require('immutable');
const expect = require('expect');
const chain = require('../ChainWithReduce');

describe.only('reducer-chain/reduce', () => {

    const action = {
        type: 'TEST',
    };
    const state = Immutable.Map({
        a: true,
        b: 1,
    });
    const reducerUpdateA = () => state.set('a', false);
    const reducerUpdateB = () => state.set('b', 2);

    it('should returns given state if empty list of reducer given', () => {
        return expect(chain([])(state, action)).toEqual(state);
    });

    it('should returns given state if no array given', () => {
        return expect(chain(null)(state, action)).toEqual(state);
    });

    it('should pass given state and action to reducer', () => {
        const spy = expect.createSpy().andReturn(state.remove('b'));

        expect(chain([spy])(state, action)).toEqual(state.remove('b'));
        return expect(spy).toHaveBeenCalledWith(state, action);
    });

    it('should returns updated state', () => {
        return expect(chain([
            reducerUpdateA,
        ])(state, action)).toEqual(state.set('a', false));
    });

    it('should returns first valid state if given state is empty', () => {
        return expect(chain([
            reducerUpdateA,
        ])(null, action)).toEqual(state.set('a', false));
    });

    it('should returns first valid state if given state is empty #2', () => {
        return expect(chain([
            () => null,
            reducerUpdateB,
        ])(null, action)).toEqual(state.set('b', 2));
    });

    it('should use given compare if valid function', () => {
        const compare = initial => (previous, current) => (current === 3 ? current : previous);

        return expect(chain(compare, [
            () => 1,
            () => 2,
            () => 3,
            () => 4,
        ])(state, action)).toEqual(3);
    });

    it('should use default compare if given is not a function', () => {
        const reducers = [
            () => null,
            () => 2,
            () => 3,
            () => 4,
        ];

        expect(chain(true, reducers)(state, action)).toEqual(4);
        expect(chain(null, reducers, null)(state, action)).toEqual(4);
        return expect(chain([], reducers)(state, action)).toEqual(4);
    });

    it('should return curried function if given first arg is predicate', () => {
        const compare = initial => (previous, current) => (current === 3 ? current : previous);
        const reducers = [
            () => null,
            () => 2,
            () => 3,
            () => 4,
        ];
        const customChain = chain(compare);

        expect(customChain).toBeA('function');
        expect(R.length(customChain)).toEqual(1);
        expect(customChain(reducers)).toBeA('function');
        expect(R.length(customChain(reducers))).toEqual(2);
        return expect(customChain(reducers)(state, action)).toEqual(3);
    });

});
