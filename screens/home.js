import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput ,
  TouchableOpacity
} from 'react-native';
import 'react-native-gesture-handler'
// import 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';




class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
        email: "",
        password: ""
    }
}


login = async () => {

  

    return fetch("http://10.0.2.2:3333/api/1.0.0/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state),
    })
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else if(response.status === 400){
            throw 'Invalid email or password';
        }else{
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
            console.log(responseJson);
            const responseJson1 = JSON.stringify(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson1);
            console.log(responseJson)
            this.props.navigation.navigate("Landing");
    })
    .catch((error) => {
        console.log(error);
    })
}


  render() {
  return (
    <View style = {styles.container}>
      <StatusBar
      backgroundColor='#b6a5e3'
      barStyle="Light-content"
      />
      <Text style={styles.welcome}>Welcome to SpaceBook!</Text>
      <TextInput
      style={styles.input} 
      placeholder="Email" 
      // onChangeText={this.handleEmailInput} value={this.state.email}
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />
       <TextInput
      style={styles.input}
      placeholder="Password" 
      //onChangeText={this.handlePasswordInput} value={this.state.password}
      onChangeText={(password) => this.setState({password})}
      secureTextEntry={true}
      value={this.state.password}
      />
      <View style = {styles.btnContainer} >
       <TouchableOpacity
       style = {styles.userBtn}
       //onPress={() => this.props.navigation.navigate("Landing")}
      onPress={() => this.login()}
       >
         <Text style = {styles.btnTxt}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity
       style = {styles.userBtn}
       onPress={() => this.props.navigation.navigate("SignUp")}
       >
         <Text style = {styles.btnTxt}>Sign Up</Text>
       </TouchableOpacity>
      </View>
      </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6a5e3'
    
  },
welcome: {
  fontSize: 30,
  textAlign: 'center',
  margin: 10,
  color: '#fff',
},
input: {
  width: "90%",  
  backgroundColor: "#fff",
  padding: 15,
  marginBottom: 10
},
btnContainer:{
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%"
},
userBtn: {
  backgroundColor: "#7fb88f",
  padding: 15,
  width: "45%"
},
btnTxt: { 
  fontSize: 18,
  textAlign: "center"
},
});

export default Login;
