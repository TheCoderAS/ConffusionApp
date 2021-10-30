import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Image } from 'react-native'
import { Card, Icon, Input, CheckBox } from "react-native-elements";
import EncryptedStorage from 'react-native-encrypted-storage'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
import { baseUrl } from "../../shared/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView } from "react-native-gesture-handler";

function LoginTab(props){
    const initialState={username:'',password:'',remember:false}
    const [formState,setFormState]=useState(initialState);

    useEffect(()=>{
        async function getterFunc(){
            let session=await retrieveUserSession()
            if(session) setFormState(session)
        }
        getterFunc()
    },[])

    const handleChange=(name,value)=>{
        setFormState({
            ...formState,
            [name]:value
        })
    }
    const storeUserSession=async()=>{
        try {
            await EncryptedStorage.setItem(
                "userinfo",
                JSON.stringify(formState)
            )    
        } catch (error) {
            console.log(error)
        }
    }
    const retrieveUserSession=async()=>{
        try {
            const session=await EncryptedStorage.getItem("userinfo")

            if(session!=undefined){
                return JSON.parse(session)
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const deleteUserSession=async()=>{
        try {
            await EncryptedStorage.removeItem('userinfo')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    const handleLogin=async()=>{
        //console.log(JSON.stringify(formState))
        if(formState.remember){
            await storeUserSession()
        }else{
            const res=await deleteUserSession()
            //console.log(res)
        }
        setFormState(initialState)
    }
    return(
            <ScrollView>
                <View style={styles.container}>
                    <Input
                        placeholder="Username"
                        leftIcon={{type:'font-awesome',name:'user-o'}}
                        onChangeText={(username)=>handleChange('username',username)}
                        value={formState.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{type:'font-awesome',name:'key'}}
                        onChangeText={(password)=>handleChange('password',password)}
                        value={formState.password}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        center
                        title="Remember me"
                        checked={formState.remember}
                        onPress={()=>handleChange('remember',!formState.remember)}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={()=>handleLogin()}
                            title="Login"
                            color="#512DA8"
                        />
                    </View>
                    <View style={styles.formButton}>
                            <Button
                                onPress={() => props.navigation.navigate('RegisterTab')}
                                title="Register"
                                clear
                                icon={
                                    <Icon
                                        name='user-plus'
                                        type='font-awesome'            
                                        size={24}
                                        color= 'blue'
                                    />
                                }
                                titleStyle={{
                                    color: "blue"
                                }}
                                />
                        </View>
                </View>
            </ScrollView>
        )
}

const RegisterTab=(props)=>{
    const initialState={
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        remember: false,
        imageUrl: baseUrl + 'images/logo.png'
    }
    const [formState,setFormState]=useState(initialState)
    const handleChange=(name,value)=>{
        setFormState({
            ...formState,
            [name]:value
        })
    }
    const getImageFromCamera=()=>{
        launchCamera({
            mediaType:'photo',
            cameraType:'front',
            saveToPhotos:true
        },(response)=>{
            console.log(response)
            if(response.didCancel){
                console.log('cancelled image')
            }
            else if(response.errorMessage){
                console.log(response.errorMessage)
            }else if(response.assets){
                setFormState({
                    ...formState,
                    imageUrl:response.assets[0].uri
                })
            }
        })
    }
    const storeUserSession=async()=>{
        try {
            await EncryptedStorage.setItem(
                "userinfo",
                JSON.stringify(formState)
            )    
        } catch (error) {
            console.log(error)
        }
    }
    // const retrieveUserSession=async()=>{
    //     try {
    //         const session=await EncryptedStorage.getItem("userinfo")

    //         if(session!=undefined){
    //             return JSON.parse(session)
    //         }else{
    //             return null
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return null
    //     }
    // }
    const deleteUserSession=async()=>{
        try {
            await EncryptedStorage.removeItem('userinfo')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const handleRegister=async()=>{
        //console.log(JSON.stringify(formState))
        if(formState.remember){
            await storeUserSession()
        }else{
            const res=await deleteUserSession()
            //console.log(res)
        }
        setFormState(initialState)
    }
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                <Image
                    source={{uri: formState.imageUrl}} 
                    loadingIndicatorSource={require('../../images/logo.png')}
                    style={styles.image} 
                />
                <Button
                    title="Camera"
                    onPress={()=>getImageFromCamera()}
                />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => setFormState({...formState,username:username})}
                    value={formState.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => setFormState({...formState,password:password})}
                    value={formState.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => setFormState({...formState,firstname:firstname})}
                    value={formState.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => setFormState({...formState,lastname:lastname})}
                    value={formState.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => setFormState({...formState,email:email})}
                    value={formState.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={formState.remember}
                    onPress={() => setFormState({...formState,remember: !formState.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 0
    },
    formCheckbox: {
        backgroundColor: null
    },
    formButton: {
        alignSelf:'center',
        margin: 10
    }
})
const Tab=createBottomTabNavigator()
const Login = ()=>{
    return(
        <Tab.Navigator
          screenOptions={{
              tabBarActiveBackgroundColor:'#9575CD',
              tabBarInactiveBackgroundColor:'#D1C4E9',
              tabBarActiveTintColor:'#ffffff',
              tabBarInactiveTintColor:'gray',
              headerShown:false
            //headerShown:false,
          }}
        >
          <Tab.Screen name="LoginTab" component={LoginTab} options={{   
              title:'Login',
              tabBarIcon:({focused,color,size})=><Icon name="sign-in" size={size} color={color} type="font-awesome"/>
          }}/>
          <Tab.Screen name="RegisterTab" component={RegisterTab} options={{
              title:'Register',
              tabBarIcon:({focused,color,size})=><Icon name="sign-out" size={size} color={color} type="font-awesome"/>
          }}/>
        </Tab.Navigator>
    )
}

export default Login;