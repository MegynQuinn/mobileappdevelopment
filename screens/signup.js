import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput ,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import 'react-native-gesture-handler'
import 'react-native-reanimated'



class Signup extends Component {


  constructor(props){
    super(props);

    this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    }
}

signup = () => {
    //Validation here...

    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 201){
            return response.json()
        }else if(response.status === 400){
            throw 'Failed validation';
        }else{
            throw 'Something went wrong';
        }
    })
    .then((responseJson) => {
           console.log("User created with ID: ", responseJson);
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
      <Text style={styles.welcome}>Sign Up Here!</Text>
      <TextInput
      style={styles.input}
      placeholder="Forename" 
      //onChangeText={this.handleForenameInput} value={this.state.forename}
      onChangeText={(first_name) => this.setState({first_name})}
      value={this.state.first_name}
      
      />
      <TextInput
      style={styles.input}
      placeholder="Surname" 
      //onChangeText={this.handleSurnameInput} value={this.state.surname}
      onChangeText={(last_name) => this.setState({last_name})}
      value={this.state.last_name}
      
      />
      <TextInput
      style={styles.input} 
      placeholder="Email" 
      //onChangeText={this.handleEmailInput} value={this.state.email}
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
      //onPress={() => this.signup()}
      //onPress={() => this.props.navigation.navigate("Home")}
       >
         <Text style = {styles.btnTxt}>Back to Login</Text>
       </TouchableOpacity>
       <TouchableOpacity
       style = {styles.userBtn}
       onPress={() => this.signup()}
       //onPress={() => this.props.navigation.navigate("Landing")}
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

export default Signup;


