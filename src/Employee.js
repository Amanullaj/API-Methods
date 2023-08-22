import { StyleSheet, Text, View,FlatList,StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import {useRoute,useNavigation} from '@react-navigation/native'

const Employee = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;
  
  return (
    <View style={{flex:1,backgroundColor:'white',}}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={{backgroundColor:'orange',padding:10,margin:20,borderRadius:10,width:'10%',
    textAlign:'center',fontSize:20,color:'black'}}>X</Text>
    </TouchableOpacity>
    <View style={{margin:20,backgroundColor:'#9999ff',padding:10,borderRadius:10}}>
      <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>ID : {item.id}</Text>
      <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Name : {item.employee_name}</Text>
      <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Salary: {item.employee_salary}</Text>
      <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Age : {item.employee_age}</Text>
      
      </View>
    </View>
  )
}

export default Employee

const styles = StyleSheet.create({})