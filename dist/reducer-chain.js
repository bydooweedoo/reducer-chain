(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define(["ramda"], factory);
	else if(typeof exports === 'object')
		exports["reducer-chain"] = factory(require("ramda"));
	else
		root["reducer-chain"] = factory(root["ramda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reducerChain = __webpack_require__(3);

	var _reducerChain2 = _interopRequireDefault(_reducerChain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _reducerChain2.default;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.withPrevious = exports.withInitial = exports.withPreviousCustomEquals = exports.withInitialCustomEquals = undefined;

	var _ramda = __webpack_require__(1);

	var _ramda2 = _interopRequireDefault(_ramda);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var currentIsNotNil = _ramda2.default.compose(_ramda2.default.not, _ramda2.default.isNil, _ramda2.default.last);

	var getPrevious = _ramda2.default.head;

	var getCurrent = _ramda2.default.last;

	var currentNotEquals = function currentNotEquals(state, equals) {
	    return _ramda2.default.pipe(getCurrent, _ramda2.default.of, _ramda2.default.prepend(state), _ramda2.default.apply(equals), _ramda2.default.not);
	};

	/**
	 * Compare current state with initial using given `equals` function.
	 * It returns previous state if current is null or equals initial state,
	 * else returns current state.
	 *
	 *      const initialState = Immutable.Map({initial: true});
	 *      const currentState = Immutable.Map({current: true});
	 *      const previousState = Immutable.Map({previous: true});
	 *      const equals = Immutable.is;
	 *      const iteratee = reducerChain.compare.withInitialCustomEquals(equals)(initialState);
	 *
	 *      iteratee(previousState, null); //=> previousState
	 *      iteratee(previousState, initialState); //=> previousState
	 *      iteratee(previousState, currentState); //=> currentState
	 */
	var withInitialCustomEquals = exports.withInitialCustomEquals = function withInitialCustomEquals(equals) {
	    return function (initial) {
	        return _ramda2.default.unapply(_ramda2.default.cond([[_ramda2.default.both(currentIsNotNil, currentNotEquals(initial, equals)), getCurrent], [_ramda2.default.T, getPrevious]]));
	    };
	};

	/**
	 * Compare current state with previous using given `equals` function.
	 * It returns previous state if current is null or equals previous state,
	 * else returns current state.
	 *
	 *      const initialState = Immutable.Map({initial: true});
	 *      const currentState = Immutable.Map({current: true});
	 *      const previousState = Immutable.Map({previous: true});
	 *      const equals = Immutable.is;
	 *      const iteratee = reducerChain.compare.withPreviousCustomEquals(equals)(initialState);
	 *
	 *      iteratee(previousState, null); //=> previousState
	 *      iteratee(previousState, initialState); //=> initialState
	 *      iteratee(previousState, currentState); //=> currentState
	 */
	var withPreviousCustomEquals = exports.withPreviousCustomEquals = function withPreviousCustomEquals(equals) {
	    return function () {
	        return (/* initial */_ramda2.default.unapply(_ramda2.default.cond([[_ramda2.default.both(currentIsNotNil, _ramda2.default.compose(_ramda2.default.not, _ramda2.default.apply(equals))), getCurrent], [_ramda2.default.T, getPrevious]]))
	        );
	    };
	};

	/**
	 * Compare current state with initial. It returns previous state if current
	 * is null or equals initial state, else returns current state.
	 *
	 *      const initialState = {initial: true};
	 *      const currentState = {current: true};
	 *      const previousState = {previous: true};
	 *      const iteratee = reducerChain.compare.withInitial(initialState);
	 *
	 *      iteratee(previousState, null); //=> previousState
	 *      iteratee(previousState, initialState); //=> previousState
	 *      iteratee(previousState, currentState); //=> currentState
	 */
	var withInitial = exports.withInitial = withInitialCustomEquals(_ramda2.default.equals);

	/**
	 * Compare current state with previous. It returns previous state if current
	 * is null or equals previous state, else returns current state.
	 *
	 *      const initialState = {initial: true};
	 *      const currentState = {current: true};
	 *      const previousState = {previous: true};
	 *      const iteratee = reducerChain.compare.withPrevious(initialState);
	 *
	 *      iteratee(previousState, null); //=> previousState
	 *      iteratee(previousState, initialState); //=> initialState
	 *      iteratee(previousState, currentState); //=> currentState
	 */
	var withPrevious = exports.withPrevious = withPreviousCustomEquals(_ramda2.default.equals);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ramda = __webpack_require__(1);

	var _ramda2 = _interopRequireDefault(_ramda);

	var _reducerUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Calls each reducers from list with given state and action and then
	 * reduce returned state using given iteratee.
	 *
	 *      const compare = initialState => (previousState, currentState) => (
	 *          currentState === null ? previousState : currentState
	 *      );
	 *      const initialState = {updated: false};
	 *      const action = {type: 'ACTION_NAME'};
	 *      const updatedState = {updated: true};
	 *      const reducer1 = (state, action) => null;
	 *      const reducer2 = (state, action) => updatedState;
	 *      const reducers1 = chain(compare, [reducer1, reducer2]);
	 *      const reducers2 = chain(compare, [reducer1]);
	 *      const reducers3 = chain(compare, []);
	 *
	 *      reducers1(initialState, action); //=> updatedState
	 *      reducers2(initialState, action); //=> initialState
	 *      reducers3(initialState, action); //=> initialState
	 */
	var chain = function chain(iteratee, reducers) {
	    return function (state, action) {
	        return _ramda2.default.reduce(iteratee(state), state, _ramda2.default.chain(function (reducer) {
	            return _ramda2.default.of(reducer(state, action));
	        }, reducers));
	    };
	};

	var safeChain = _ramda2.default.converge(chain, [_ramda2.default.pipe(_ramda2.default.nthArg(0), _reducerUtils.iteratee.getIterateeOrUseDefault), _ramda2.default.pipe(_ramda2.default.nthArg(1), _reducerUtils.reducer.getReducers)]);

	var safeChainCurried = _ramda2.default.curryN(2, safeChain);

	var withSingleArg = _ramda2.default.cond([[_reducerUtils.iteratee.isIteratee, safeChainCurried], [_reducerUtils.reducer.areReducers, safeChainCurried(null)], [_ramda2.default.T, safeChain]]);

	var curriedChain = _ramda2.default.unapply(_ramda2.default.cond([[_ramda2.default.pipe(_ramda2.default.length, _ramda2.default.equals(1)), _ramda2.default.pipe(_ramda2.default.head, withSingleArg)], [_ramda2.default.T, _ramda2.default.apply(safeChain)]]));

	curriedChain.compare = _reducerUtils.compare;

	exports.default = curriedChain;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reducer = __webpack_require__(6);

	var reducer = _interopRequireWildcard(_reducer);

	var _compare = __webpack_require__(2);

	var compare = _interopRequireWildcard(_compare);

	var _iteratee = __webpack_require__(5);

	var iteratee = _interopRequireWildcard(_iteratee);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	    reducer: reducer,
	    compare: compare,
	    iteratee: iteratee
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIterateeOrUseDefault = exports.isIteratee = exports.defaultIteratee = undefined;

	var _ramda = __webpack_require__(1);

	var _ramda2 = _interopRequireDefault(_ramda);

	var _compare = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultIteratee = exports.defaultIteratee = _compare.withInitial;

	/**
	 * Check if given argument is an Iteratee.
	 *
	 *    isIteratee(initial => (previous, current) => current) //=> true
	 *    isIteratee((arg1, arg2) => true) //=> true
	 *    isIteratee(null) //=> false
	 *
	 */
	var isIteratee = exports.isIteratee = _ramda2.default.is(Function);

	/**
	 * Returns default iteratee if given argument is not a valid iteratee else
	 * returns given iteratee.
	 *
	 *    getIterateeOrUseDefault(
	 *        initial => (previous, current) => current
	 *    ) //=> initial => (previous, current) => current
	 *    getIterateeOrUseDefault((arg1, arg2) => true) //=> (arg1, arg2) => true
	 *    getIterateeOrUseDefault(null) //=> defaultIteratee
	 *
	 */
	var getIterateeOrUseDefault = exports.getIterateeOrUseDefault = _ramda2.default.ifElse(isIteratee, _ramda2.default.identity, _ramda2.default.always(defaultIteratee));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getReducers = exports.areReducers = exports.isReducer = undefined;

	var _ramda = __webpack_require__(1);

	var _ramda2 = _interopRequireDefault(_ramda);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Check if given argument is a Reducer.
	 *
	 *    isReducer((state, action) => state) //=> true
	 *    isReducer(state => state) //=> true
	 *    isReducer(null) //=> false
	 *
	 */
	var isReducer = exports.isReducer = _ramda2.default.is(Function);

	var isNotEmptyArray = _ramda2.default.pipe(_ramda2.default.length, _ramda2.default.gte(_ramda2.default.__, 1));

	var isArrayOfReducers = _ramda2.default.both(isNotEmptyArray, _ramda2.default.pipe(_ramda2.default.reject(isReducer), _ramda2.default.length, _ramda2.default.equals(0)));

	/**
	 * Check if given Object or Array only contain Reducers.
	 *
	 *    areReducers([
	 *        (state, action) => state.set('ok', 1)),
	 *        state => state.set('ok', true),
	 *    ]) //=> true
	 *    areReducers({
	 *        reducer1: (state, action) => state.set('ok', 1)),
	 *        reducer2: state => state.set('ok', true),
	 *    ]) //=> true
	 *    areReducers([
	 *        (state, action) => state.set('ok', 1)),
	 *        null,
	 *    ]) //=> false
	 *    areReducers({
	 *        reducer1: (state, action) => state.set('ok', 1)),
	 *        reducer2: null,
	 *    ]) //=> false
	 *
	 */
	var areReducers = exports.areReducers = _ramda2.default.cond([[_ramda2.default.is(Array), isArrayOfReducers], [_ramda2.default.is(Object), _ramda2.default.pipe(_ramda2.default.values, isArrayOfReducers)], [_ramda2.default.T, _ramda2.default.always(false)]]);

	/**
	 * Return Array of reducers from given Object or Array.
	 *
	 *    getReducers([
	 *        (state, action) => state.set('ok', 1)),
	 *        state => state.set('ok', true),
	 *    ]) //=> [Function, Function]
	 *    getReducers({
	 *        reducer1: (state, action) => state.set('ok', 1)),
	 *        reducer2: state => state.set('ok', true),
	 *    ]) //=> [Function, Function]
	 *    getReducers([
	 *        (state, action) => state.set('ok', 1)),
	 *        null,
	 *    ]) //=> []
	 *    getReducers({
	 *        reducer1: (state, action) => state.set('ok', 1)),
	 *        reducer2: null,
	 *    ]) //=> []
	 *
	 */
	var getReducers = exports.getReducers = _ramda2.default.ifElse(areReducers, _ramda2.default.values, _ramda2.default.compose(_ramda2.default.empty, _ramda2.default.of));

/***/ }
/******/ ])
});
;