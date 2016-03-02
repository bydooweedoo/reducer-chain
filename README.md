<a name="module_reducer-chain"></a>
## reducer-chain
**Version**: 1.0.0  
**Example**  
Import `ES5`
```js
const reducerChain = require('reducer-chain');
```
Import `ES6`
```js
import reducerChain from 'reducer-chain';
```
**Example**  
```js
const chainedReducer = reducerChain([reducer1, reducer2, reducer3]);
// chainedReducer(state, action) => will call all reducers with given state and action and take the first non null different one.
```
**Example**  
Sample code:
```js
// Chain takes 2 arguments:
//    1. The reducer iteratee callback
//    2. The list of reducers.
// Then it returns a high order reducer that will call each given reducers and return the proper state.
//
// The iteratee callback will firstly be called with the given state.
// Then the iteratee callback will return the reduce iteratee function which takes
// the previous and current state.
// Finally the iteratee will have to return the proper state at each call.
const chain = (iteratee, reducers) => (state, action) => R.reduce(
    iteratee(state), state, R.chain(
        reducer => R.of(reducer(state, action)),
        reducers
    )
);
```

* [reducer-chain](#module_reducer-chain)
    * [R](#exp_module_reducer-chain--R) ⏏
        * [~chain([iteratee], reducers)](#module_reducer-chain--R..chain) ⇒ <code>Reducer</code>
        * [~Reducer](#module_reducer-chain--R..Reducer) ⇒ <code>any</code>
        * [~Iteratee](#module_reducer-chain--R..Iteratee) ⇒ <code>any</code>
        * [~IterateeInit](#module_reducer-chain--R..IterateeInit) ⇒ <code>Iteratee</code>

<a name="exp_module_reducer-chain--R"></a>
### R ⏏
**Kind**: global constant of <code>[reducer-chain](#module_reducer-chain)</code>  
<a name="module_reducer-chain--R..chain"></a>
#### R~chain([iteratee], reducers) ⇒ <code>Reducer</code>
**Kind**: inner method of <code>[R](#exp_module_reducer-chain--R)</code>  
**Returns**: <code>Reducer</code> - High order reducer chaining given reducers list.  

| Param | Type | Description |
| --- | --- | --- |
| [iteratee] | <code>IterateeInit</code> | Custom iteratee init function. |
| reducers | <code>Array.&lt;Reducer&gt;</code> | List of reducers to chain. |

**Example**  
```js
import reducerChain from 'reducer-chain';
import { reducer1, reducer2, reducer3 } from './your-reducers';

const reducer = (state, action) => {
    if (!state) state = initialState;
    return reducerChain([
        reducer1,
        reducer2,
        reducer3,
    ])(state, action);
};
```
**Example**  
Using custom compare function:
```js
import reducerChain from 'reducer-chain';
import reducers from './your-reducers';

const compare = initial => (previous, current) => (
    current && !current.equals(initial) ?
    current :
    previous
);
const reducer = reducerChain(compare, reducers);

// reducer(state, action) => ...
```
**Example**  
You also can curry your custom compare:
```js
import reducerChain from 'reducer-chain';
import reducers from './your-reducers';

const compare = initial => (previous, current) => (
    current && !current.equals(initial) ?
    current :
    previous
);
const customReducerChain = reducerChain(compare);
const reducer = customReducerChain(reducers);

// reducer(state, action) => ...
```
<a name="module_reducer-chain--R..Reducer"></a>
#### R~Reducer ⇒ <code>any</code>
**Kind**: inner typedef of <code>[R](#exp_module_reducer-chain--R)</code>  
**Returns**: <code>any</code> - Updated state.  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>any</code> | The state of your application. |
| action | <code>Object</code> | Action. |

<a name="module_reducer-chain--R..Iteratee"></a>
#### R~Iteratee ⇒ <code>any</code>
**Kind**: inner typedef of <code>[R](#exp_module_reducer-chain--R)</code>  
**Returns**: <code>any</code> - State to keep.  

| Param | Type | Description |
| --- | --- | --- |
| previousState | <code>any</code> | Previous state. Defaults to the initial state (reduce accumulator). |
| currentState | <code>any</code> | Current state. |

<a name="module_reducer-chain--R..IterateeInit"></a>
#### R~IterateeInit ⇒ <code>Iteratee</code>
**Kind**: inner typedef of <code>[R](#exp_module_reducer-chain--R)</code>  
**Returns**: <code>Iteratee</code> - Iterator function for reduce.  

| Param | Type | Description |
| --- | --- | --- |
| initialState | <code>any</code> | The state given to the high order reducer. |

## Testing

```shell
npm test
```

## Benchmark

```shell
npm run bench
```
