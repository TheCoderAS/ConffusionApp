import React, { Component, useState } from 'react';
import {Text,ScrollView,View} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../shared/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RenderItem(props){
    const item=props.item
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
const Home =()=> {

    const dishes=useSelector(state=>state.dishes.dishes)
    const comments=useSelector(state=>state.comments.comments)
    const promotions=useSelector(state=>state.promotions.promotions)
    const leaders=useSelector(state=>state.leaders.leaders)
    return(
        <ScrollView>
            <Ionicons
                testID="nextButton"
                name="home"
                color="rgba(0, 0, 0, .9)"
                size={24}
                style={{backgroundColor: 'transparent'}}
                />
            <RenderItem item={dishes.filter(dish=>dish.featured)[0]} />
            <RenderItem item={promotions.filter(promo=>promo.featured)[0]}/>
            <RenderItem item={leaders.filter(leader=>leader.featured)[0]}/>
        </ScrollView>
    );
}

export default Home;