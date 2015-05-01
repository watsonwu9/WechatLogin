'use strict';

var React = require('react-native');
var StyleSheet= React.StyleSheet;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
 
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loginContainer: {
    position:'relative',
    top:40,
    backgroundColor: '#00CD00',
    color:'#090404',
    borderRadius: 10,
  


  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    margin: 10,
    opacity: 0.8,
  },
  aboutButtonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#efefef',
    opacity: 1,
  },
  contentContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 65,
    alignItems: 'center',
    alignSelf: 'center',
  },

  wechatLoginButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },

  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
  },
  aboutTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});
