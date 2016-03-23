import reducerChain from 'reducer-chain';
import initialState from '../states/initial';
import incrementReducer from './increment';
import decrementReducer from './decrement';

const reducers = reducerChain([
  incrementReducer,
  decrementReducer,
]);

export default (state, action) => {
  return reducers(state ? state : initialState, action);
};
