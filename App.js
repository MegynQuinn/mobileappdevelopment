import 'react-native-gesture-handler';
import React, { Component } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/home';
import SignUpScreen from './screens/signup';
import LandingScreen from './screens/landing';
import ProfileScreen from './screens/profile';

const Drawer = createDrawerNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="SignUp" component={SignUpScreen} />
                    <Drawer.Screen name="Landing" component={LandingScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />

                </Drawer.Navigator>
                
            </NavigationContainer>
        );
    }
}

export default App;