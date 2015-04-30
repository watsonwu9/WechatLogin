/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var DeviceEventEmitter = require('RCTDeviceEventEmitter');
//var MyView = require('./MyView');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  //Image,
  TouchableHighlight,
  NavigatorIOS,
  //Navigator,
} = React;

var WechatLoginManager = require('NativeModules').WechatLoginManager;





var subscription = DeviceEventEmitter.addListener(
'UserInfo',
(user) => {
  console.log("i find something from OC");
  console.log(user.nickname);
  console.log(user.headimgurl);
  //yiqixie.setState(respCode:user.respCode);


}
);
// var MyView =React.createClass({
//   render:function(){
//     return(
//     <View>
//     <Text style={styles.welcome}>Beijing</Text>
//     </View>
//     );
//   },
// });



var yiqixie = React.createClass({

  

  WXLogin(){
    WechatLoginManager.sendAuthReq();
  },

  getInitialState:function(){
    return{
      nickname:'caicai',
      openid :'87892',
      headimgurl:'',
      respCode:'dd',

    }
  },

  // renderScene(route, nav) {
  //   // switch (route.id) {
  //   //   case 'authenticate':
  //   //     return <LoginScreen navigator={nav} />;
  //   //   case 'user-info':
  //   //     return <UserInfoScreen navigator={nav} />;
  //   //   default:
  //   //     return <View />;
  //   // }
  //   return(
  //   <View>
  //   <Text>Beijing</Text>
  //   </View>
  //   );
  // },

  componentDidMount:function(){
    console.log("Mounted")


    
  },


  componentDidUnmount: function() {
    subscription.remove();
  },

  render: function() {


    return (
    //          <Navigator
    // initialRoute={{name: 'My First Scene', index: 0}}
    // renderScene={this.renderScene} />
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      // </View>

      // <NavigatorIOS styles={styles.container}
      // initialRoute={{
      //   component: MyView,
      //   title: 'My View Test',
      //   passProps: { myProp: 'foo' },
      // }}/>

      <View style={styles.container}>
        <TouchableHighlight onPress={this.WXLogin}>

          <Text style={styles.welcome}>
            Wechat Login
          </Text>

        </TouchableHighlight>

      </View>



    
    );
  }
});

var MyView = React.createClass({
  render:function(){
    console.log('My View render triggered');
    return (
        <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Hello there, welcome to My View
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});



AppRegistry.registerComponent('yiqixie', () => yiqixie);
