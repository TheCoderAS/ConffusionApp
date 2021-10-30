import React from "react";
import { View, Text, ScrollView, Animated, Alert } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import {Loading } from './Loading'
import { baseUrl } from '../../shared/config'
import { useDispatch, useSelector } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import { deleteFavorite } from "../../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';

const RenderItem=({item, index, navigation})=>{
    const dispatch=useDispatch()

    const swipeRight=(progress,dragX)=>{
        const scale=dragX.interpolate({
            inputRange:[-200,0],
            outputRange:[1,0.5],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={{backgroundColor:'red',width:'30%',justifyContent:'center'}}>
                <Animated.Text style={{marginLeft:'auto',marginRight:50,fontSize:15,fontWeight:'bold',transform:[{scale}]}} onPress={()=>{
                    Alert.alert('Delete Favorite?','Are you sure you wish to delete the favorite dish ' + item.name + '?',[
                        {
                            text:'Cancel',
                            onPress:()=>{console.log('Not deleted!')},
                            style:'cancel'
                        },
                        {
                            text:'OK',
                            onPress:()=>dispatch(deleteFavorite(item.id))
                        }
                    ],
                    {cancelable:false})
                }}>Delete</Animated.Text>
            </Animated.View>
        )
    }
    return(
            <Swipeable renderRightActions={swipeRight} rightThreshold={-200} shouldCancelWhenOutside={true}>
                <Animatable.View animation="fadeInRightBig" delay={index*300} duration={2000}>
                    <ListItem onPress={()=>{navigation.navigate('DishDetail',{dishId:item.id})}}>
                        <Avatar containerStyle={{ borderWidth: 2, borderColor: '#c4c4c4' }} rounded source={{ uri: baseUrl + item.image }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle style={{ color: '#999' }}>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Animatable.View>
            </Swipeable>
        )
}

const Favourites=(props)=>{
    const dishes=useSelector(state=>state.dishes)
    const favorites = useSelector(state => state.favorites)

    if(dishes.isLoading){
        return(
            <Loading/>
        )
    }else if(dishes.errMess){
        return(
            <View>
                <Text style={{color:'#999999'}}>{dishes.errMess}</Text>
            </View>
        )
    }else{
        return(
            <ScrollView>
                {dishes.dishes.filter((dish=>favorites.some(el=>el===dish.id))).map((item,index)=>{
                    return(
                        <RenderItem key={index} index={index} item={item} navigation={props.navigation}/>
                    )
                })}
            </ScrollView>
        )
    }
}

export default Favourites