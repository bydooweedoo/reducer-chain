import assert from 'assert';
import reducer from './reducers';

let state;

state = reducer(null, {});
assert(state.counter === 0);

state = reducer(state, { type: 'INCREMENT' });
assert(state.counter === 1);

state = reducer(state, { type: 'DECREMENT' });
assert(state.counter === 0);

state = reducer(state, { type: 'INCREMENT' });
state = reducer(state, { type: 'INCREMENT' });
state = reducer(state, { type: 'INCREMENT' });
assert(state.counter === 3);

state = reducer(state, { type: 'DECREMENT' });
state = reducer(state, { type: 'DECREMENT' });
state = reducer(state, { type: 'DECREMENT' });
assert(state.counter === 0);

state = reducer(state, { type: 'INCREMENT' });
state = reducer(state, { type: 'DECREMENT' });
state = reducer(state, { type: 'DECREMENT' });
assert(state.counter === 0);

console.log('OK');
