/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var DeviceEventEmitter = require('RCTDeviceEventEmitter');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  //Image,
  TouchableHighlight,
} = React;

var WeixinLoginManager = require('NativeModules').WeixinLoginManager;
//var appDelegate = require('NativeModules').appDelegate;




var subscription = DeviceEventEmitter.addListener(
'UserInfo',
(user) => {
  //this.setState({nickname:user.nickname});
  // this.setState({openid:user.openid});
  // this.setState({headimgurl:user.headimgurl});
  console.log("i find something from OC");
  console.log(user.nickname);


}
);

var yiqixie = React.createClass({

  

  WXLogin(){
    WeixinLoginManager.sendAuthReqToWX();
  },

  getInitialState:function(){
    return{
      nickname:'caicai',
      openid :'87892',
      headimgurl:''

    }
  },

  componentDidMount:function(){
    console.log("Mounted")


    
  },


  componentDidUnmount: function() {
    subscription.remove();
  },

  render: function() {


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Beijing Welcomes you and your family 
          {this.state.nickname}
          {this.state.openid}
        </Text>

         <TouchableHighlight onPress={this.WXLogin}>

          <Text style={styles.welcome}>
            Wechat Login
          </Text>

        </TouchableHighlight>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('yiqixie', () => yiqixie);
