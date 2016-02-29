const R = require('ramda');

exports = module.exports = R.ifElse(
    R.is(Array),
    R.identity,
    R.always([])
);
