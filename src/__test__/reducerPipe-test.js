import R from 'ramda';
import Immutable from 'immutable';
import expect from 'expect';
import reducerPipe from '../reducerPipe';
import { compareWithPrevious } from '../compare';

describe('reducer-pipe', () => {

    const action = {
        type: 'TEST',
    };
    const state = Immutable.Map({
        a: true,
        b: 1,
    });
    const reducerUpdateA = () => state.set('a', false);
    const reducerUpdateB = () => state.set('b', 2);

    it('should returns given state if no reducers', () => {
        expect(reducerPipe([])(state, action)).toEqual(state);
    });

    it('should call first reducer with given state and action', () => {
        const spy = expect.createSpy().andReturn(null);

        expect(reducerPipe([spy])(state, action)).toEqual(state);
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.length).toEqual(1);
        expect(spy).toHaveBeenCalledWith(state, action);
    });

    it('should call second reducer with kept state and given action', () => {
        const spy1 = expect.createSpy().andReturn(state.set('a', 'from spy1'));
        const spy2 = expect.createSpy().andReturn(state.set('a', 'from spy2'));

        expect(reducerPipe([spy1, spy2])(state, action)).toEqual(state.set('a', 'from spy2'));
        expect(spy2).toHaveBeenCalled();
        expect(spy2.calls.length).toEqual(1);
        expect(spy2).toHaveBeenCalledWith(state.set('a', 'from spy1'), action);
    });

    it('should call third reducer with kept state and given action', () => {
        const spy1 = expect.createSpy().andReturn(null);
        const spy2 = expect.createSpy().andReturn(state.set('a', 'from spy2'));
        const spy3 = expect.createSpy().andReturn(null);

        expect(reducerPipe([spy1, spy2, spy3])(state, action)).toEqual(state.set('a', 'from spy2'));
        expect(spy3).toHaveBeenCalled();
        expect(spy3.calls.length).toEqual(1);
        expect(spy3).toHaveBeenCalledWith(state.set('a', 'from spy2'), action);
    });

});
