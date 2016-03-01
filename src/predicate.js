'use strict';

const R = require('ramda');

const base = (initial, current) => R.ifElse(
    R.both(
        R.compose(R.not, R.isNil),
        R.compose(R.not, R.equals(initial))
    ),
    R.identity,
    R.always(initial)
)(current);

const is = R.both(
    R.is(Function),
    R.pipe(R.length, R.equals(2))
);

const gets = R.ifElse(
    is,
    R.identity,
    R.always(base)
);

module.exports = {
    base,
    is,
    gets,
};
