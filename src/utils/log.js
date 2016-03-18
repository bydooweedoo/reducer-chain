import R from 'ramda';

export const debug = R.tap(console.log);

export const debugType = R.tap(R.pipe(R.type, debug));

export const trace = msg => R.pipe(R.concat(msg + ' '), debug);

export const traceType = msg => R.pipe(debugType, trace(msg));
