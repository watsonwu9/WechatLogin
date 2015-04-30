'use strict';

var React = require('react-native');



var {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Navigator,

} = React;

// var STORAGE_KEY ='@ThisIsTheKey';
// var STORAGE_KEY_IMAGE = '@ThisIsTheKeyForImage';

// var DeviceEventEmitter = require('RCTDeviceEventEmitter');

// var WechatLoginManager = require('NativeModules').WechatLoginManager;
// var subscription = DeviceEventEmitter.addListener(
//         'UserInfo',
//         (user) => {
//           console.log("i find something from OC");
//           console.log(user.nickname);
//           console.log(user.country);
//           console.log(user.openid);

//           AsyncStorage.setItem(STORAGE_KEY,user.nickname)
//             .done();
//           AsyncStorage.setItem(STORAGE_KEY_IMAGE,user.headimgurl)
//             .done();
//           //UserLoginedIn = user;
//           //LoginScreen.setState({UserLoginedIn:user});
//           //yiqixie.setState(respCode:user.respCode);

//         }
// );

//var UserActions = require('../Actions/UserActions');
 var UserStore = require('../Stores/UserStore');
 var Video = require('react-native-video');
 var Modal = require('react-native-modal');
// var LinearGradient = require('react-native-linear-gradient');
// // var UserActions = require('../Actions/UserActions');
 var styles = require('./Styles');
 var UserStoreSync = require('../Mixins/UserStoreSync');
//   var DeviceHeight = require('Dimensions').get('window').height;

var LoginScreen = React.createClass({
   mixins: [UserStoreSync, Modal.Mixin],

  login() {
    console.log("we are about to login in");
    UserActions.LoginInWechat();
    //WechatLoginManager.sendAuthReq();
   
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (user.get('nickname')) {
      this.props.navigator.replace({id: 'user-info'});
    }

  },



  getInitialState:function(){
    console.log("Initialed");
    return{
      nickname:'',
      headimgurl:'',


    };
  },

  componentWillMount:function(){
     console.log("will mounted");
    // AsyncStorage.getItem(STORAGE_KEY)
    //   .then((value) =>{
    //     if (value !== null){
    //     this.setState({nickname:value});
    //     console.log('the loginIn user is '+value);
    //    }else{
    //     console.log('no valid user');
    //    }
    //   })
    //   //.catch((error) => this._appendMessage('AsyncStorage error: in getting Item ' + error.message))
    //   .done();

    // AsyncStorage.getItem(STORAGE_KEY_IMAGE)
    //   .then((value) =>{
    //     if (value !== null){
    //     this.setState({headimgurl:value});
    //     //console.log('the loginIn user is '+value);
    //    }else{
    //     console.log('no valid user');
    //    }
    //   })
    //   //.catch((error) => this._appendMessage('AsyncStorage error: in getting Item ' + error.message))
    //   .done();
  
    },


  render() {
    
           return(  
                  <TouchableHighlight 
                        style= {styles.wrapper}
                        onPress={this.login}>
                        <Text style={styles.aboutButtonText}>
                        Sign Up {this.state.nickname}
                       </Text>    
                  </TouchableHighlight>
              );
          }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
    marginTop:200,

  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 80,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#FF4500',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#FF4500',
    margin: 10,
    opacity: 0.8,
  },
  loginContainer: {
    backgroundColor: 'transparent',
  },
});


module.exports = LoginScreen;
