
//var dispatcher = require('../AppDispatcher');
//var UserStore = require('../Stores/UserStore');
//var UserConstants = require('../Constants/UserConstants');
//var WechatApi = require('../Apis/WechatApi');
var AlertIOS = require('react-native').AlertIOS;

var DeviceEventEmitter = require('RCTDeviceEventEmitter');
var WechatLoginManager = require('NativeModules').WechatLoginManager;
var WechatApi = require('../Apis/WechatApi');

var subscription = DeviceEventEmitter.addListener(
        'UserInfo',
        (user) => {
          console.log("i find something from OC");
          console.log(user.nickname);
          console.log(user.country);
          console.log(user.openid);
          WechatApi.getUserInfo(user.nickname,user.headimgurl);



          // AsyncStorage.setItem(STORAGE_KEY,user.nickname)
          //   .done();
          // AsyncStorage.setItem(STORAGE_KEY_IMAGE,user.headimgurl)
          //   .done();
          //UserLoginedIn = user;
          //LoginScreen.setState({UserLoginedIn:user});
          //yiqixie.setState(respCode:user.respCode);

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
