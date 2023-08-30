import { StyleSheet, Text, View,Button,TextInput } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';

const UpdateModal = (props) => {
    const[employee_name,setEmployee_name] = useState();
    const[employee_salary,setEmployee_salary] = useState();
    const[employee_age,setEmployee_age] = useState();
    
    useEffect(()=>{
      if(props.selectedUser){
      setEmployee_name(props.selectedUser.employee_name);
      setEmployee_salary(props.selectedUser.employee_salary);
      setEmployee_age(props.selectedUser.employee_age);
  }
    },[props.selectedUser])
    const updateUser = async () => {
      const url = 'http://10.0.2.2:3000/data';
      const id = props.selectedUser.id;

      let result = await fetch(`${url}/${id}`,{
          method:'PUT',headers:{"content-Type":"application/json"},
          body:JSON.stringify({employee_name,employee_salary, employee_age})
      })
            result = await result.json();
          if(result){
              props.getData();
              props.setShowModal(false);
          }
          
      

    }
  return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <View style={{backgroundColor:'white',padding:20}}>
          <TextInput style={{height:40,width:300,borderWidth:0.5,borderRadius:10,marginBottom:10}} 
          value={employee_name} onChangeText={(text)=>setEmployee_name(text)}/>
          <TextInput style={{height:40,width:300,borderWidth:0.5,borderRadius:10,marginBottom:10}}
          value={employee_salary} onChangeText={(text)=>setEmployee_salary(text)}/>
          <TextInput style={{height:40,width:300,borderWidth:0.5,borderRadius:10,marginBottom:10}} 
          value={employee_age} onChangeText={(text)=>setEmployee_age(text)}/>
          <View style={{marginBottom:10}}>
          <Button title='Update' onPress={()=>updateUser()} />
          </View>
          <Button title='Close' onPress={()=>props.setShowModal(false)} />
      </View>
      </View>
  )
  }

export default UpdateModal

const styles = StyleSheet.create({})