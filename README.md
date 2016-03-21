# reducer-chain [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![Coveralls][coverage-badge]][coverage]

[build-badge]: https://img.shields.io/travis/bydooweedoo/reducer-chain/master.svg?style=flat-square
[build]: https://travis-ci.org/bydooweedoo/reducer-chain

[coverage-badge]: https://img.shields.io/codecov/c/github/bydooweedoo/reducer-chain.svg?style=flat-square
[coverage]: https://codecov.io/github/bydooweedoo/reducer-chain

[npm-badge]: https://img.shields.io/npm/v/reducer-chain.svg?style=flat-square
[npm]: https://www.npmjs.org/package/reducer-chain

`reducer-chain` helps you to chain `redux` reducers with given state and action, then keep last updated state.

You can rewrite this:
```js
const reducer = (state, action) => {
  if (!state) state = initialState;
  switch (action.type) {
    case 'ADD':
    case 'INCREMENT':
      return incrementReducer(state, action);
    case 'SUBTRACT':
    case 'DECREMENT':
      return decrementReducer(state, action);
    case 'RESET':
      return merge(state, {counter: 0});
    default:
      return state;
  }
};

reducer({counter: 0}, {type: 'INCREMENT'}); //=> {counter: 1}
```

To this:
```js
import reducerChain from 'reducer-chain';

const chain = reducerChain([
  incrementReducer,
  decrementReducer,
]);

const reducer = (state, action) => {
  if (!state) state = initialState;
  switch (action.type) {
    case 'RESET':
      return merge(state, {counter: 0});
    default:
      return chain(state, action);
  }
};

reducer({counter: 0}, {type: 'INCREMENT'}); //=> {counter: 1}
```

> _See also_ `reducer-pipe` in order to pipe previously saved/returned state to next reducer in list with given action.

## Getting started

Install `reducer-chain` using [npm](https://www.npmjs.org/):

```shell
npm install reducer-chain --save
```

Then using ES6

```js
import { increment, decrement } from './my-reducers';
import reducerChain from 'reducer-chain';

export default reducerChain([
  increment,
  decrement,
]);
```

Using ES5

```js
var myReducers = require('./my-reducers');
var reducerChain = require('reducer-chain');

module.exports = reducerChain([
  myReducers.increment,
  myReducers.decrement,
]);
```

## Usage

Let's say you want to build a counter reducer.
You want it to stores the current counter state and be able to handle
increment and decrement actions.

```js
// states/initial.js
export default Object.freeze({
  counter: 0,
  updatedAt: null,
});

export const merge = (state, updates) => Object.freeze(
  Object.assign({}, state, updates)
);
```

```js
import { merge } from './states/initial';

// reducers/increment.js
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
```

```js
import { merge } from './states/initial';

// reducers/decrement.js
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
```

```js
// reducers/counter.js
import reducerChain from 'reducer-chain';
import initialState from './states/initial';
import increment from './increment';
import decrement from './decrement';

const chain = reducerChain([
  increment,
  decrement,
]);

export default (state, action) => {
  return chain(state ? state : initialState, action);
};
```

## Explanation

Take the example from the previous chapter and do:
```js
reducer({counter: 0}, {type: 'INCREMENT'});
```
Here what happens:

1. Calls `increment({counter: 0}, {type: 'INCREMENT'})` and stores the result `{counter: 1}` in `results[0]`
2. Calls `decrement({counter: 0}, {type: 'INCREMENT'})` and stores the result `{counter: 0}` in `results[1]`
3. Calls `initialize({counter: 0})` from default compare and stores the `iterator`.
4. Iterate from stored `results` and calls `iterator({counter: 0}, results[0])`.
5. Keep returned state `{counter: 1}` and calls `iterator({counter: 1}, result[1])`.
5. Keep previous state `{counter: 1}` and returns it.


## Default compare

`reducer-chain` built in with a default `compare` function.

On every result, if the resulted state is defined and non-null, then it will compare it to the given state.
If the current state is different to the given state, then it will keep the current state.

## Custom compare

Signature:
```js
initialize(givenState) => iterator(previousState, currentState) => nextState
```

* `givenState` is corresponding to the state passed to the high order reducer.
* `previousState` is corresponding to the previously saved state. Defaults to `givenState`.
* `currentState` is corresponding to the state returned by the reducer at the current index in the list.
* `nextState` is corresponding to the state you want to keep.
* `initialize` will be called everytime once with the given state from the high order reducer.
It must returns an iterator function for comparing previous and current state, and return the prefered one.
* `iterator` will be called on each reducer result (passed as `currentState`). It must compare with `previousState` (defaults to `givenState`) and
return the state you want to keep next.

_Note_: Please note that **all** reducers will be call before the `iterator`.
The order of each call remain the same as given to `chain`.

## Links

* `renum` is a small library to create enum using frozen objects in javascript from multiple sources.
* `reducer-pipe` helps you to pipe given reducers with the previously saved/returned state and given action.
* `reducer-sandbox` helps you to reuse your reducers in different place without conflict them.
