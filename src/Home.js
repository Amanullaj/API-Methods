import { StyleSheet, Text, View,TextInput, SafeAreaView, FlatList,Button, SectionList, Image, TouchableOpacity, StatusBar,Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import UpdateModal from './UpdateModal';

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


export default Home

const styles = StyleSheet.create({})