var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var UserConstants = require('../Constants/UserConstants');


module.exports = {
  getUserInfo(userId, token) {


    var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${token1}&openid=${userId1}` + 
    '&fields=nickname,headimgurl&format=json';
    console.log(url);
    var key = UserConstants.WECHAT_SIGN_IN;
    var params = {userId: userId, token: token};

    dispatch(key, ApiConstants.PENDING, params);
    fetch(url).then(handleResponse(key, params));
  }
};