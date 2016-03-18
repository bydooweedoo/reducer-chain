# reducer-chain [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![Coveralls][coverage-badge]][coverage]

[build-badge]: https://img.shields.io/travis/bydooweedoo/reducer-chain/master.svg?style=flat-square
[build]: https://travis-ci.org/bydooweedoo/reducer-chain

[coverage-badge]: https://img.shields.io/codecov/c/github/bydooweedoo/reducer-chain.svg?style=flat-square
[coverage]: https://codecov.io/github/bydooweedoo/reducer-chain

[npm-badge]: https://img.shields.io/npm/v/reducer-chain.svg?style=flat-square
[npm]: https://www.npmjs.org/package/reducer-chain

`reducer-chain` helps you to chain `redux` reducers easily.

## Getting started

Install `reducer-chain` using [npm](https://www.npmjs.org/):

```shell
npm install reducer-chain --save
```

Then using ES6

```js
import { counterReducer, incReducer, decReducer } from './my-reducers';
import reducerChain from 'reducer-chain';

export default reducerChain(
  counterReducer,
  incReducer,
  decReducer
);
```

Using ES5

```js
var myReducers = require('./my-reducers');
var reducerChain = require('reducer-chain');

module.exports = reducerChain(
  myReducers.counterReducer,
  myReducers.incReducer,
  myReducers.decReducer
);
```

## Usage

Let's say you want to build a counter reducer.
You want it to stores the current counter state and be able to handle
increment and decrement actions.

```js
// reducers/initial.js
import Immutable from 'immutable';

const initialState = Immutable.Map({
  counter: 0,
  updatedAt: null,
});

export default (state, action) => {
  if (!state) {
    state = initialState;
  }
  return state;
};
```

```js
// reducers/increment.js
export default (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.updateIn(['counter'], value => value + 1);
  }
  return state;
};
```

```js
// reducers/decrement.js
export default (state, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return state.updateIn(['counter'], value => Math.max(0, value - 1));
  }
  return state;
};
```

```js
// reducers/counter.js
import reducerChain from 'reducer-chain';
import initialReducer from './initial';
import incrementReducer from './increment';
import decrementReducer from './decrement';

export default reducerChain(
  initialReducer,
  incrementReducer,
  decrementReducer
);
```

## Links

* `renum` is a small library to create frozen objects in javascript from multiple sources.
* `reducer-sandbox` helps you to reuse your reducers in different place without conflict them.
