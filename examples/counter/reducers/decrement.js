import { merge } from '../states/initial';

export default (state, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return merge(state, {
        counter: Math.max(0, state.counter - 1),
      });
    default:
      return state;
  }
};
