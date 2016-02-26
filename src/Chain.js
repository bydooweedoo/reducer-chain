'use strict';

/**
 * @alias module:reducer-sandbox
 */
const ObjectPath = require('./ObjectPath');
let sandboxcount = -1;

/**
 * @param {Function} reducer - Reducer to sandbox.
 * @param {String} [customid] - Custom sandbox id.
 * @param {String} [customkey='sandbox'] - Custom sandbox key path.
 * You can use "key1.key2.key3" notation.
 */
function Sandbox (reducer, customid, customkey) {
    const sandboxid = String(customid || ++sandboxcount);
    const params = (
        customkey ?
        ObjectPath.create(customkey, sandboxid) :
        { sandbox: sandboxid, }
    );
    const getSandboxValue = (action) => (
        customkey ?
        ObjectPath.get(action, customkey) :
        action.sandbox
    );

    return {

        dispatcher: store => action => {
            return store.dispatch(Object.assign({}, params, action));
        },

        reducer: (state, action) => {
            return (
                !action || getSandboxValue(action) === sandboxid ?
                reducer(state, action) :
                reducer(state, {})
            );
        },

    };
}

exports = module.exports = Sandbox;
