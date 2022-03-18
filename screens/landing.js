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
import 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';




class Landing extends Component {

  constructor(props){
    super(props);

    this.state = {
        token: ''
    }
}

componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();
    });        
}

componentWillUnmount(){
    this._unsubscribe();
}

checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value !== null) {
      this.setState({token:value});
    }else{
        this.props.navigation.navigate("Home");
    }
}

logout = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/logout", {
        method: 'post',
        headers: {
            "X-Authorization": token
        }
    })
    .then((response) => {
        if(response.status === 200){
            this.props.navigation.navigate("Home");
        }else if(response.status === 401){
            this.props.navigation.navigate("Home");
        }else{
            throw 'Something went wrong';
        }
    })
    .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
    })
}


  render() {
  return (
    <View style = {styles.container}>
      <StatusBar
      backgroundColor='#b6a5e3'
      barStyle="Light-content"
      />
      <Text style={styles.welcome}>SpaceBook Home Page</Text>

      <View style = {styles.btnContainer} >
       <TouchableOpacity
       style = {styles.userBtn}
       onPress={() => this.props.navigation.navigate("Profile")}
       >
         <Text style = {styles.btnTxt}>My Profile</Text>
       </TouchableOpacity>
       <TouchableOpacity
       style = {styles.userBtn}
       //onPress={() => this.props.navigation.navigate("Home")}
       onPress={() => this.logout()}
       >
         <Text style = {styles.btnTxt}>Log Out</Text>
       </TouchableOpacity>
      </View>

      <TextInput
      style={styles.input}
      placeholder="Write a post"
      />
      </View>
      
    
  );


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6a5e3'
    
  },
welcome: {
  fontSize: 30,
  // textAlign: 'cente',
  margin: 10,
  color: '#fff',
},
input: {
  width: "90%",  
  backgroundColor: "#fff",
  padding: 15,
  marginTop: 20,
  marginBottom: 20
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

export default Landing;


