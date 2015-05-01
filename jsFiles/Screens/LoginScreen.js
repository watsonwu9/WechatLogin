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
var LinearGradient = require('react-native-linear-gradient');

var styles = require('./Styles');
var UserStoreSync = require('../Mixins/UserStoreSync');
var Video = require('react-native-video');
var Modal = require('react-native-modal');
var DeviceHeight = require('Dimensions').get('window').height;

var LoginScreen = React.createClass({
   mixins: [UserStoreSync, Modal.Mixin],

  login() {
    console.log("about to login in LoginScreen");
    UserActions.LoginInWechat();
  
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();
    console.log('after the update in LoginScreen');

    if (user.get('userId')) {
      console.log('user get the userId');
      this.props.navigator.replace({id: 'user-info'});
    }

  },

  showModalTransition(transition) {
    transition('opacity', {duration: 200, begin: 0, end: 1});
    transition('height', {duration: 200, begin: DeviceHeight * 2, end: DeviceHeight});
  },

  hideModalTransition(transition) {
    transition('height', {duration: 200, begin: DeviceHeight, end: DeviceHeight * 2, reset: true});
    transition('opacity', {duration: 200, begin: 1, end: 0});
  },


  render() {
    
           return(  
              <View style={styles.container}>
               
                <TouchableOpacity onPress={this.login}>
                  <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Image style={styles.wechatLoginButton} source={require('image!wx_button')} />
                  </LinearGradient>
                </TouchableOpacity>
            

                <View style={styles.footer}>
                  <TouchableOpacity onPress={this.openModal} style={styles.aboutButton}>
                    <Text style={styles.aboutButtonText}>
                      About this project
                    </Text>
                  </TouchableOpacity>
                </View>


                <Modal isVisible={this.state.isModalOpen}
                   onClose={this.closeModal}
                   backdropType="blur"
                   backdropBlur="light"
                   customShowHandler={this.showModalTransition}
                   customHideHandler={this.hideModalTransition}
                   onPressBackdrop={this.closeModal}>
                  <Text style={styles.aboutTitle}>
                    Welcome to the about section!
                  </Text>

                  <Text style={styles.aboutBody}>
                    This is just for fun to use a modal, nothing fancy to see here. A big thanks
                    the react-native team for this wonderful tool!
                  </Text>
                </Modal>

              </View>
              );
          }
});


module.exports = LoginScreen;
