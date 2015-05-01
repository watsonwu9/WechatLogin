
var dispatcher = require('../AppDispatcher');
var UserStore = require('../Stores/UserStore');
var UserConstants = require('../Constants/UserConstants');

var AlertIOS = require('react-native').AlertIOS;

var DeviceEventEmitter = require('RCTDeviceEventEmitter');
var WechatLoginManager = require('NativeModules').WechatLoginManager;
var WechatApi = require('../Apis/WechatApi');

var subscription = DeviceEventEmitter.addListener(
        'UserInfo',
      
         (code) => {
          console.log("callback from OC");
          WechatApi.getUserInfo(code.userId,code.token);
        
        }
);



module.exports = {

  LoginInWechat() {
     WechatLoginManager.sendAuthReq();
  },
 

  signOut() {
    dispatcher.handleViewAction({
      actionType: UserConstants.SIGN_OUT,
    });
  },

}
