import React, { Component, useEffect } from 'react';
import Menu from './components/Menu';
import { DISHES } from '../shared/dishes';
import { Button, Text, View } from 'react-native';
import DishDetail from './components/DishDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import { connect, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import Reservation from './components/Reservation';
import Favourites from './components/Favourite';
import Login from './components/Login';

const Stack=createNativeStackNavigator()
const Tab=createBottomTabNavigator()
const Drawer=createDrawerNavigator()

function MenuStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle:{
          backgroundColor:'#FF6600'          
        },
        headerTintColor:'#FFFFFF'
      }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="DishDetail" component={DishDetail} />
    </Stack.Navigator>
  );
}
function FavoriteStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Favourites"
      screenOptions={{
        headerStyle:{
          backgroundColor:'#FF6600'          
        },
        headerTintColor:'#FFFFFF',
        //headerShown:false
      }}
    >
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="DishDetail" component={DishDetail} />
    </Stack.Navigator>
  );
}
const LoginStackScreen=()=>{
  return(
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle:{
          backgroundColor:'#FF6600'          
        },
        headerTintColor:'#FFFFFF',
        //headerShown:false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}
function HomeNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  )
}
function MainNavigator(){
  return(
    <Drawer.Navigator 
      screenOptions={{
        drawerStyle:{
          backgroundColor:'#ff00ff'
        },
        drawerInactiveTintColor:'#e6e6fa',
        drawerActiveTintColor:'#ffffff',
        drawerActiveBackgroundColor:'#ee82ee'
      }}
    >
      <Drawer.Screen name="HomeStack" options={{title:'Home'}} component={HomeNavigator}/>
      <Drawer.Screen name="MenuStack" options={{title:'Menu'}} component={MenuStackScreen}/>
      <Drawer.Screen name="Contact" options={{title:'Contact Us'}} component={Contact}/>
      <Drawer.Screen name="About" options={{title:'About Us'}} component={About}/>
      <Drawer.Screen name="Reservation" options={{title:'Reserve Table',drawerLabel:'Reserve Table',drawerIcon:({tintColor,focused})=>{<Icon name="cutlery" type="font-awesome" size={24} iconStyle={{color:tintColor}} />
      }}} component={Reservation}/>

      <Drawer.Screen name="Favorites" options={{title:'Favorites',drawerLabel:'Favorites',drawerIcon:({tintColor,focused})=>{<Icon name="cutlery" type="font-awesome" size={24} iconStyle={{color:tintColor}} />
      }}} component={FavoriteStackScreen} />

      <Drawer.Screen name="LoginComp" options={{title:'Login',drawerLabel:'Login'}} component={LoginStackScreen} />
    </Drawer.Navigator>
  )
}
export default function Main() {
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(fetchDishes())
      dispatch(fetchComments())
      dispatch(fetchLeaders())
      dispatch(fetchPromos())
    },[])
    return (
      <View style={{flex:1}}>
        {/* <Tab.Navigator
          screenOptions={{
            headerShown:false,
            sh
          }}
        >
          <Tab.Screen name="Home" component={MenuStackScreen}/>
          <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator> */}
        <MainNavigator/>
      </View>
    );
}