/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Alert
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import {Actions} from 'react-native-router-flux';
import bgImage from '../images/background.jpg'
import logo from '../images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component <[]> {

  forgotpw() { 
    Actions.forgotpw() 
  }


  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPassword: ''
    }
  }


    userlogin = () =>{
        const {userEmail, userPassword} = this.state;
        Keyboard.dismiss();

      
      fetch('http://192.168.1.139/ontrek/userlogin.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword
      })
      
      }).then((response) => response.json())
          .then((responseJson) => {
      
            // If server response message same as Data Matched
            if(responseJson === 'Data Matched')
            {
                alert("Login Success");
                // this.props.navigation.navigate('Second', { Email: userEmail });
            }
            else{
      
              Alert.alert(responseJson);
            }
      
          }).catch((error) => {
            console.error(error);
          });
      
      } 

  render() {
  return (  
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View styles={styles.logoContainer}>
          <Image source = {logo} style={styles.logo}/>
          <Text style={styles.logotext}>ONTREK</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'person-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder = {'Email'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            keyboardType="email-address"
            onChangeText={userEmail => this.setState({userEmail})}
            />
        </View>

        <View style={styles.inputContainer}>
        <Icon name={'lock-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder = {'Password'}
            secureTextEntry = {true}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            onChangeText={userPassword => this.setState({userPassword})}
            />

        </View>
        <TouchableOpacity style={styles.btnForgot} onPress={this.forgotpw}>
          <Text style={styles.forgettext}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress={this.userlogin}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.forgettext}>Register</Text>
        </TouchableOpacity>

    </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 120,

  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  
  logotext: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    margin: 10,
    opacity: 0.8
  },
  
  input: {
    width: WIDTH - 70,
    height: 40,
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    opacity: 0.8,
    marginHorizontal: 25
  }, 

  inputIcon: {
    position: 'absolute',
    top: 5,
    left: 35
  },
  inputContainer:{
    marginTop:10
  },

  btnLogin:{
    width: WIDTH - 70,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(19, 27, 35, 0.6)',
    justifyContent: 'center',
    marginTop: 10
  },

  btnForgot: {
    top: 4,
    right: 100,
  },

  btnRegister: {
    justifyContent: 'center',
    top: 10
  },


  logintext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },

  forgettext: {
    color: 'rgba(225, 225, 225, 1)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
  }
});

