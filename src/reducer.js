'use strict';

const R = require('ramda');

const is = R.both(
    R.is(Function),
    R.length(2)
);

const are = R.is(Array);

const gets = R.ifElse(
    are,
    R.identity,
    R.compose(R.empty, R.of)
);

module.exports = {
    is,
    are,
    gets,
};
