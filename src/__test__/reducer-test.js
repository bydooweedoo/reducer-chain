import R from 'ramda';
import expect from 'expect';
import reducer from '../reducer';

describe('reducer', () => {

    describe('#isReducer', () => {

        it('should be a property function', () => {
            expect(reducer.isReducer).toBeA(Function);
        });

        it('should return true if given arg is a Reducer', () => {
            expect(reducer.isReducer((state, action) => state)).toEqual(true);
            expect(reducer.isReducer(state => state)).toEqual(true);
        });

        it('should return false if given arg is not a Reducer', () => {
            expect(reducer.isReducer([() => true])).toEqual(false);
            expect(reducer.isReducer({})).toEqual(false);
            expect(reducer.isReducer(null)).toEqual(false);
            expect(reducer.isReducer(1)).toEqual(false);
            expect(reducer.isReducer(false)).toEqual(false);
            expect(reducer.isReducer('1')).toEqual(false);
        });

    });

    describe('#areReducers', () => {

        const reducer1 = state => state;
        const reducer2 = () => true;

        it('should be a property function', () => {
            expect(reducer.areReducers).toBeA(Function);
        });

        it('should return true if given arg is an Array of Reducers', () => {
            expect(reducer.areReducers([
                reducer1,
                reducer2,
            ])).toEqual(true);
        });

        it('should return true if given arg is an Object of Reducers', () => {
            expect(reducer.areReducers({
                reducer1: reducer1,
                reducer2: reducer2,
            })).toEqual(true);
        });

        it('should return false if given arg is an Array with not only Reducers', () => {
            expect(reducer.areReducers([
                reducer1,
                true,
            ])).toEqual(false);
        });

        it('should return true if given arg is an Object with not only Reducers', () => {
            expect(reducer.areReducers({
                reducer1: reducer1,
                reducer2: true,
            })).toEqual(false);
        });

        it('should return false if given arg is invalid', () => {
            expect(reducer.areReducers([])).toEqual(false);
            expect(reducer.areReducers({})).toEqual(false);
            expect(reducer.areReducers(null)).toEqual(false);
            expect(reducer.areReducers(1)).toEqual(false);
            expect(reducer.areReducers(false)).toEqual(false);
            expect(reducer.areReducers('1')).toEqual(false);
        });

    });

    describe('#getReducers', () => {

        const reducer1 = state => state;
        const reducer2 = () => true;

        it('should be a property function', () => {
            expect(reducer.getReducers).toBeA(Function);
        });

        it('should return given arg if it is an Array of Reducers', () => {
            expect(reducer.getReducers([
                reducer1,
                reducer2,
            ])).toEqual([
                reducer1,
                reducer2,
            ]);
        });

        it('should return list of given object values if given arg is an Object of Reducers', () => {
            expect(reducer.getReducers({
                reducer1: reducer1,
                reducer2: reducer2,
            })).toEqual([
                reducer1,
                reducer2,
            ]);
        });

        it('should return empty list if given arg is an Array with not only Reducers', () => {
            expect(reducer.getReducers([
                reducer1,
                true,
            ])).toEqual([]);
        });

        it('should return empty list if given arg is an Object with not only Reducers', () => {
            expect(reducer.getReducers({
                reducer1: reducer1,
                reducer2: true,
            })).toEqual([]);
        });

        it('should return empty list if given arg is invalid', () => {
            expect(reducer.getReducers([])).toEqual([]);
            expect(reducer.getReducers({})).toEqual([]);
            expect(reducer.getReducers(null)).toEqual([]);
            expect(reducer.getReducers(1)).toEqual([]);
            expect(reducer.getReducers(false)).toEqual([]);
            expect(reducer.getReducers('1')).toEqual([]);
        });

    });

});
