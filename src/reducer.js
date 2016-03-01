'use strict';

const R = require('ramda');

const is = R.both(
    R.is(Function),
    R.length(2)
);

const are = R.or(
    R.is(Array),
    R.is(Object)
);

const gets = R.ifElse(
    are,
    R.values,
    R.compose(R.empty, R.of)
);

module.exports = {
    is,
    are,
    gets,
};
