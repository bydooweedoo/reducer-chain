// const SimpliestChain = (reducers, compare) => (initialState, action) => (
//     R.head(R.append(
//         initialState,
//         R.filter((
//             R.is(Function, compare) ?
//             compare(initialState) :
//             R.compose(R.not, R.equals(initialState))
//             // state => state !== initialState
//         ), R.chain(reducer => [reducer(initialState, action)], reducers))
//     ))
// );
//
// const SimplerChain = (reducers, compare) => (initialState, action) => (
//     R.converge((...states) => (
//         R.head(R.append(
//             initialState,
//             R.filter((
//                 R.is(Function, compare) ?
//                 compare(initialState) :
//                 state => state !== initialState
//             ), states)
//         ))
//     ), reducers)(initialState, action)
// );
//
// function SimpleChain (initialState, reducers) {
//     const compare = state => !state.equals(initialState);
//
//     return R.converge((...states) => R.head(R.append(initialState, R.filter(compare, states))), reducers);
// }
//
// function SimpleChain2 (initialState, reducers) {
//     const compare = state => {
//         return !state.equals(initialState)
//     };
//
//     return R.converge(
//         states => {
//             return R.head(R.append(initialState, R.filter(compare, states)))
//         },
//         reducers
//     );
// }

/**
 * @param {Function|Object} initial Initial state or reducer to base comparaison in.
 * @param {Array.<Function>} reducers List of reducers to chain.
 * @param {Function} [customCompare] Custom compare function.
 * @return {Function} Chain function.
 */
// function Chain (initial, reducers, customCompare) {
//
//     const getCompare = (compare, initialState) => R.cond([
//         [R.is(Function), f => f(initialState)],
//         [R.T, () => state => state !== initialState],
//     ])(compare);
//
//     const getInitialReducer = R.cond([
//         [R.is(Function), f => f],
//         [R.T, R.always],//state => () => state],
//     ]);
//
//     const findNextState = states => {
//         const initialState = R.head(states);
//
//         return R.cond([
//             [R.isNil, state => initialState],
//             [R.T, state => state],
//         ])(R.head(
//             R.filter(
//                 getCompare(customCompare, initialState),
//                 R.tail(states)
//             )
//         ));
//     };
//
//     const argsToArray = f => (function () {
//         return f(arguments);
//     });
//
//     return R.converge(
//         argsToArray(findNextState),
//         R.prepend(getInitialReducer(initial), reducers)
//     );
// }
