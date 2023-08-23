import { StyleSheet, Text, View,TextInput, SafeAreaView, FlatList,Button, SectionList, Image, TouchableOpacity, StatusBar,Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const[showModal,setShowModal] = useState(false);
    const[selectedUser,setSelectedUser] = useState();
    const getData = async () => {
        const url = 'http://10.0.2.2:3000/data';
        let result = await fetch(url);
        result = await result.json();
        setUser(result)
       
    }

    const deleteUser = async (id) => {
        const url = 'http://10.0.2.2:3000/data';
        let result = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        if (result) {
            console.warn('User Deleted');
            getData();
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const updateUser = (data) => {
        setShowModal(true)
        setSelectedUser(data)
    }
    const searchUser = async (text) => {
        const url = `http://10.0.2.2:3000/data?q=${text}`;
        let result = await fetch(url);
        result = await result.json();
        if (result) {
            setUser(result)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            <Text style={{ fontSize: 30, color: 'orange', textAlign: 'center', fontWeight: 'bold' }}>Employees List</Text>
            <TextInput placeholder='Search Here' onChangeText={(text)=>searchUser(text)} 
            style={{borderColor:'#9999ff',borderWidth:1,margin:20,borderRadius:20}}/>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }}>Add Employee</Text>
                        <Image source={require('../src/images/plus.png')} style={{ height: 40, width: 40, tintColor: 'orange' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList data={user}
                renderItem={({ item, index }) =>
                    <View style={{ margin: 10, backgroundColor: '#9999ff', padding: 10, borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Employee', item)}>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>Name : {item.employee_name}</Text>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>Salary : {item.employee_salary}</Text>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>Age : {item.employee_age}</Text>
                            <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => deleteUser(item.id)}
                                style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10, alignItems: 'center', width: '40%' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateUser(item)}
                                style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10, alignItems: 'center', width: '40%' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>Update</Text>
                            </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                } />

                <Modal visible={showModal} transparent={true} >
                   <UpdateModal setShowModal={setShowModal} selectedUser={selectedUser} getData={getData}/>
                </Modal>
        </SafeAreaView>
    )
}
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

export default Home

const styles = StyleSheet.create({})