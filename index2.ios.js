/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginScreen =require('./jsFiles/Screens/LoginScreen');
var UserInfoScreen = require('./jsFiles/Screens/UserInfoScreen');
var LocalStorage = require('./jsFiles/Stores/LocalStorage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Navigator,
} = React;


var yiqixie = React.createClass({
  getInitialState(){
    return{bootstrapped:false}
  },

  componentWillMount(){
    console.log("yiqixie will mount in index2");
    LocalStorage.bootstrap(() => this.setState({bootstrapped:true}));
  },
 

  renderScene(route,nav){
    console.log("index2 rendered");
      switch(route.id){
        case 'authenticate':
          console.log('entering LoginScreen');
          return <LoginScreen navigator={nav}/>;
        case 'user-info':
           console.log('entering UserInfoScreen');
          return <UserInfoScreen navigator={nav}/>;
        default:
          return <View />;

      }

  },

  render: function() {
    if (this.state.bootstrapped === false) {
      return <View />
    }

    return (  

      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

            return Navigator.SceneConfigs.FloatFromRight;
        }}/>


    
    );

    
  }
});



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#90c57f',
    marginTop: 100,


  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90c57f',
    marginTop: 180,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,

  }

});



AppRegistry.registerComponent('yiqixie', () => yiqixie);
