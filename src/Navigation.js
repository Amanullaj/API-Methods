import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Employee from './Employee';
import Contact from './Contact'
import List from './List';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='Employee' component={Employee} options={{headerShown:false}}/>
        <Stack.Screen name='Contact' component={Contact} options={{headerShown: false}}/>
        <Stack.Screen name='List' component={List} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})