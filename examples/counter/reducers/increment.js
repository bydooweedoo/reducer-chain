import { merge } from '../states/initial';

export default (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return merge(state, {
        counter: state.counter + 1,
      });
    default:
      return state;
  }
};
