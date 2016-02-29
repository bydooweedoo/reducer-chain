'use strict';

const Immutable = require('immutable');
const expect = require('expect');
const chain = require('../Chain');
const getOREmptyList = require('../utils/getOREmptyList');

describe('reducer-chain', () => {

    const action = {
        type: 'TEST',
    };
    const state = Immutable.Map({
        a: true,
        b: 1,
    });
    const reducerUpdateA = () => state.set('a', false);
    const reducerUpdateB = () => state.set('b', 2);

    it('should returns given Array', () => {
        return expect(getOREmptyList([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should returns empty Array', () => {
        return expect(getOREmptyList(null)).toEqual([]);
    });

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

    it('should returns first valid state if given state is empty', () => {
        return expect(chain([
            () => null,
            reducerUpdateB,
        ])(null, action)).toEqual(state.set('b', 2));
    });

    it('should use given compare if valid function', () => {
        const compare = initial => currentState => currentState === 3;

        return expect(chain([
            () => 1,
            () => 2,
            () => 3,
            () => 4,
        ], compare)(state, action)).toEqual(3);
    });

    it('should use default compare if given is not a function', () => {
        const reducers = [
            () => null,
            () => 2,
            () => 3,
            () => 4,
        ];

        expect(chain(reducers, true)(state, action)).toEqual(2);
        expect(chain(reducers, null)(state, action)).toEqual(2);
        return expect(chain(reducers, [])(state, action)).toEqual(2);
    });

});
