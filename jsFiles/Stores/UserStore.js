var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var UserConstants = require('../Constants/UserConstants');
var merge = require('merge');

var _user = Immutable.Map();

var store = createStore({
  setState(user) {
    console.log('set user state in userStore');
    _user = Immutable.fromJS(user || {});
  },

  getState() {
    console.log("get user state in userStore");
    console.log(_user);
    return _user;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case UserConstants.WECHAT_SIGN_IN:
        _user = Immutable.fromJS(merge(action.response, action.queryParams));
        store.emitChange(action);
        break;
      case UserConstants.SIGN_OUT:
        _user = Immutable.Map();
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
