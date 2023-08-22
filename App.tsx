import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import Navigation from './src/Navigation'


const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Navigation/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})