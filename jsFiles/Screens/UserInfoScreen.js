'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} = React;


 var UserStoreSync = require('../Mixins/UserStoreSync');
 var UserStore = require('../Stores/UserStore');
 var UserActions = require('../Actions/UserActions');
 var styles = require('./Styles');

var UserInfoScreen = React.createClass({
  mixins: [UserStoreSync],

  afterUpdateUserFromStore() {
    var user = UserStore.getState();
    console.log("afterUpdateUserFromStore rendered in UserInfoScreen");

    if (!user.get('userId')) {
      this.props.navigator.replace({id: 'authenticate'});
    }
  },

  render() {


    return (

       <View style={styles.background}>

            <View style={styles.contentContainer}>
            <Image style={styles.profilePicture} source={{uri:this.state.user.get('headimgurl')}} />
            
            <View style={styles.loginContainer}>
              <TouchableOpacity onPress={UserActions.signOut}>
                <Text  style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
        </View>
        
       </View>
    );
  },
});

module.exports = UserInfoScreen;
