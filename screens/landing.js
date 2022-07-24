import React, { Component, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput ,
  TouchableOpacity,
  FlatList,
  Button,
  SafeAreaView
} from 'react-native';
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';




class Landing extends Component {

  
  constructor(props){
    super(props);

    this.state = {
        token: '',
        setNewPost: '',
        newPost: "",
        newPosts: [],
        value: ''
        
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
        // this.props.navigation.navigate("Home");
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
        throw error;
    }
}



logout = async () => {
    let sessiondt = await AsyncStorage.getItem('@session_token');
    const data = JSON.parse(sessiondt);
    
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/logout", {
        method: 'post',
        headers: {
            "X-Authorization": data.token
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
        throw error;
    })
}

// post = async () => {
  
//   let sessiondt = await AsyncStorage.getItem('@session_token');
//   const data = JSON.parse(sessiondt);
//   let newPost = this.state.items.concat(this.state.newPost);
//   // await AsyncStorage.removeItem('@session_token');
//   return fetch('http://10.0.2.2:3333/api/1.0.0/user/${data}/post', {
//       method: 'post',
//       headers: {
//           "X-Authorization": data },
//       body: JSON.stringify({
//       text: newPost
//       })
      
//   })
//   .then((response) => {
//       if(response.status === 200){
//           this.props.navigation.navigate("Landing");
//       }else if(response.status === 401){
//           this.props.navigation.navigate("Landing");
//       }else{
//           throw 'Something went wrong';
//       }
//   })
//   .catch((error) => {
//       console.log(error);
//       ToastAndroid.show(error, ToastAndroid.SHORT);
//       throw error;
//   })
// }


addPost = () => {
  let Post = this.state.newPosts.concat(this.state.newPost);
  this.setState({
    newPosts: Post,
    newPost: ""
  });
}

remove = (index) => {
  console.log(index);
  let newList = this.state.newPosts;
  newList.splice(index, 1);
  this.setState({newPosts: newList});
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
      placeholder='Write a post'
      onChangeText={value => this.setState({newPost: value})}
                value={this.state.newPost}
      
                
                
      />
      

      <TouchableOpacity
      
       style = {styles.userBtn}
       onPress={() => {this.addPost();
      }}
     
       >
         <Text style = {styles.btnTxt}>Post</Text>
       </TouchableOpacity>
       
       <SafeAreaView style={styles.PostBox}>
       <FlatList
       
          data={this.state.newPosts}
          
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({item, index}) => 
         
            <View>
              
              <Text style={styles.input}>{item}</Text>
              
              <Button
                onPress={() => this.remove(index)}
                title="Delete Post"
              />
            </View>
            
          }
          
        />
</SafeAreaView>

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

  PostBox: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginVertical: 8,
    marginHorizontal: 16,
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

item: {
  width: 500,
  backgroundColor: '#1e81b0',
  padding: 5,
  marginVertical: 8,
  marginHorizontal: 500,
  flexGrow: 0
},

});

export default Landing;



