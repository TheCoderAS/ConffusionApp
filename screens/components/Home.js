import React, { Component, useState } from 'react';
import {Text,ScrollView,View} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../shared/config';
import {Loading} from './Loading'

function RenderItem(props){
    const item=props.item
    if(props.isLoading){
        return(
            <Loading/>
        )
    }else if(props.errMess){
        return(
            <View>
                <Text style={{color:'#999999'}}>{props.errMess}</Text>
            </View>
        )
    }else{
        if(item != null){
            return(
                <Card>
                    <Card.FeaturedTitle style={{color:'#333'}}>{item.name}</Card.FeaturedTitle>
                    <Card.FeaturedSubtitle style={{color:'#333'}}>{item.designation}</Card.FeaturedSubtitle>
                    <Card.Image source={{uri:baseUrl+item.image}} />
                    <Text style={{margin:10,color:'#999999'}}>
                        {item.description}
                    </Text>
                </Card>
            )
        }else{
            return(<View></View>)
        }
    }
}
const Home =()=> {

    const dishes=useSelector(state=>state.dishes)
    const comments=useSelector(state=>state.comments)
    const promotions=useSelector(state=>state.promotions)
    const leaders=useSelector(state=>state.leaders)
    return(
        <ScrollView>
            <RenderItem 
                item={dishes.dishes.filter(dish=>dish.featured)[0]}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
            />
            <RenderItem
                item={promotions.promotions.filter(promotion=>promotion.featured)[0]}
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}            
            />
            <RenderItem 
                item={leaders.leaders.filter(leader=>leader.featured)[0]}
                isLoading={leaders.isLoading}
                errMess={leaders.errMess}            
            />
        </ScrollView>
    );
}

export default Home;