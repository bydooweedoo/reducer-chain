<a name="module_reducer-chain"></a>
## reducer-chain
**Version**: 1.0.0  
**Example**  
Import `ES5`
```js
const chain = require('reducer-chain');
```
Import `ES6`
```js
import chain from 'reducer-chain';
```
**Example**  
```js
const chained = chain([reducer1, reducer2, reducer3]);
// chain(state, action) => will call all reducers with given state and action and take the first non null different one.
```
<a name="exp_module_reducer-chain--R"></a>
### R ⏏
**Kind**: global constant of <code>[reducer-chain](#module_reducer-chain)</code>  
## Testing

```shell
npm test
```

## Benchmark

```shell
npm run bench
```
