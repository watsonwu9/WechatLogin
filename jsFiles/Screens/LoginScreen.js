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



var UserActions = require('../Actions/UserActions');
var UserStore = require('../Stores/UserStore');
var Video = require('react-native-video');
var Modal = require('react-native-modal');
var LinearGradient = require('react-native-linear-gradient');

var styles = require('./Styles');
var UserStoreSync = require('../Mixins/UserStoreSync');
//   var DeviceHeight = require('Dimensions').get('window').height;

var LoginScreen = React.createClass({
   mixins: [UserStoreSync, Modal.Mixin],

  login() {
    console.log("about to login in LoginScreen");
    UserActions.LoginInWechat();
    //WechatLoginManager.sendAuthReq();
   
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();
    console.log('after the update in LoginScreen');

    if (user.get('userId')) {
      console.log('user get the userId');
      this.props.navigator.replace({id: 'user-info'});
    }

  },



  getInitialState:function(){
    return{
      // nickname:'',
      // headimgurl:'',


    };
  },

  componentWillMount:function(){
     console.log("will mounted in LoginScreen");

  
    },


  render() {
    
           return(  
              <View style={styles.container}>
                <View style={styles.loginContainer}>
                      <TouchableOpacity onPress={this.login}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                          <Text style={styles.buttonText}>
                            Sign in with WeChat
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                </View>

              </View>
              );
          }
});


module.exports = LoginScreen;
