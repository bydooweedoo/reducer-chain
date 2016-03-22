# reducer-chain [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![Coveralls][coverage-badge]][coverage]

[build-badge]: https://img.shields.io/travis/bydooweedoo/reducer-chain/master.svg?style=flat-square
[build]: https://travis-ci.org/bydooweedoo/reducer-chain

[coverage-badge]: https://img.shields.io/codecov/c/github/bydooweedoo/reducer-chain.svg?style=flat-square
[coverage]: https://codecov.io/github/bydooweedoo/reducer-chain

[npm-badge]: https://img.shields.io/npm/v/reducer-chain.svg?style=flat-square
[npm]: https://www.npmjs.org/package/reducer-chain

`reducer-chain` helps you to chain `redux` reducers with given state and action, then keep last updated state.

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

## Examples

* [counter](./examples/counter)

## Compare signature

```js
initialize(initialState) => iterator(previousState, currentState) => nextState
```

* `initialState` is corresponding to the state passed to the high order reducer.
* `previousState` is corresponding to the previously returned state. Defaults to `initialState`.
* `currentState` is corresponding to the state returned by the reducer at the current index in the list.
* `nextState` is corresponding to the state you want to keep.
* `initialize` will be called everytime once with the given state from the high order reducer.
It must returns an iterator function for comparing previous and current state, and return the prefered one.
* `iterator` will be called on each reducer result (passed as `currentState`). It must compare with `previousState` (defaults to `initialState`) and
return the state you want to keep next.

_Note_: Please note that **all** reducers will be call before the `iterator`.
The order of each call remain the same as given to `chain`.

## Available compare functions

`reducer-chain` built in with 4 different compare functions available under `reducerChain.compare`:

| Name | Signature | Equals |
| ---- | --------- | ------ |
| `withInitial` (default) | `(initialState) => (previousState, currentState) => nextState` | `R.equals(initialState, currentState)` |
| `withInitialCustomEquals` | `(customEquals) => (initialState) => (previousState, currentState) => nextState` | `customEquals(initialState, currentState)` |
| `withPrevious` | `(initialState) => (previousState, currentState) => nextState` | `R.equals(previousState, currentState)` |
| `withPreviousCustomEquals` | `(customEquals) => (initialState) => (previousState, currentState) => nextState` | `customEquals(previousState, currentState)` |

## Compare usage

With `immutable`:
```js
// ./immutableReducerChain.js
import Immutable from 'immutable';
import reducerChain from 'reducer-chain';

export default reducerChain(
  reducerChain.compare.withPreviousCustomEquals(Immutable.is)
);
```
```js
// ./index.js
import Immutable from 'immutable';
import { reducer1, reducer2 } from './reducers';
import immutableReducerChain from './immutableReducerChain';

const reducers = immutableReducerChain([
  reducer1,
  reducer2,
]);

const initialState = Immutable.Map({counter: 0});

export default (state, action) => {
  return reducers(state ? state : initialState, action);
};
```

With custom compare:
```js
import reducerChain from 'reducer-chain';
import {reducer1, reducer2} from './reducers';

const customCompare = initialState => (previousState, currentState) => (
  currentState !== null &&
  currentState !== initialState ?
  currentState : previousState
);

const reducers = reducerChain(customCompare, [
  reducer1,
  reducer2,
]);

const initialState = Object.freeze({counter: 0});

export default (state, action) => {
  return reducers(state ? state : initialState, action);
};
```

## Links

* `renum` is a small library to create enum using frozen objects in javascript from multiple sources.
* `reducer-pipe` helps you to pipe given reducers with the previously saved/returned state and given action.
* `reducer-sandbox` helps you to reuse your reducers in different place without conflict them.
