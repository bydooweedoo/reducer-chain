export default Object.freeze({
  counter: 0,
  updatedAt: null,
});

export const merge = (state, updates) => Object.freeze(
  Object.assign({}, state, updates)
);
