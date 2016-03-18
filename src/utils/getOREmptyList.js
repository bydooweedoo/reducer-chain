import R from 'ramda';

export default R.ifElse(
    R.is(Array),
    R.identity,
    R.always([])
);
