import { StyleSheet, Text, TextInput, TouchableOpacity, View,Alert, StatusBar } from 'react-native'
import React, { useState } from 'react'

const Contact = ({navigation}) => {
    const [employee_name, setEmployee_name] = useState("");
    const [employee_salary, setEmployee_salary] = useState("");
    const [employee_age, setEmployee_age] = useState("");
   
      
      const saveAPIData = async () => {
        if(!employee_name && !employee_salary && !employee_age) {
          Alert.alert("Please fill all the fields");
      } else {
          Alert.alert("Data Saved ");
          navigation.navigate('Home');
      }
        let result = await fetch("http://10.0.2.2:3000/data",
        {method:'POST',headers:{"content-Type":"application/json"},
      body:JSON.stringify({employee_name,employee_salary, employee_age})})
        result = await result.json();
      }
       
    
  
  return (
    <View style={{flex:1,backgroundColor:"#e6f2ff"}}>
      <StatusBar backgroundColor={'#e6f2ff'}/>
    <View style={{alignItems:"center",margin:20,marginBottom:10}}>
      <Text style={styles.txt1}>Submit Your Details</Text>
      </View>
      <View style={{margin:10}}>
        <Text style={styles.txt2}>Enter Your Name</Text>
        <TextInput placeholder='Enter Name' style={styles.input}
        value={employee_name} onChangeText={(employee_name)=>setEmployee_name(employee_name)}/>
      </View>
      <View style={{margin:10}}>
        <Text style={styles.txt2}>Enter Your Age</Text>
        <TextInput placeholder='Enter Age' style={styles.input}
        value={employee_age} onChangeText={(employee_age)=>setEmployee_age(employee_age)}/>
      </View>
      <View style={{margin:10}}>
        <Text style={styles.txt2}>Enter Your Salary</Text>
        <TextInput placeholder='Enter Salary' style={styles.input}
        value={employee_salary} onChangeText={(employee_salary)=>setEmployee_salary(employee_salary)}/>
      </View>
    
      <View style={{flexDirection:"row",margin:10,alignItems:"center"}}>
        
          
        <Text style={{marginLeft:10,fontSize:15}}>I have read & agreed the terms</Text>
      </View>
      <View >
      <TouchableOpacity style={styles.btn}
          onPress={saveAPIData}>
        <Text style={styles.txt3}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}


export default Contact;

const styles = StyleSheet.create({
    input : {borderWidth:0.5,fontSize:20,},
    txt1 : {fontSize:25,fontWeight:"bold",color:"black"},
    txt2 : {fontSize:20,fontWeight:"bold",color:"black"},
    txt3 : {fontSize:20,fontWeight:"bold",color:"white"},
    btn : {padding:10,margin:30,alignItems:"center",backgroundColor:"#9999ff",borderRadius:20}
   
})