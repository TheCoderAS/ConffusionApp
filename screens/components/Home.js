import React, { Component, useEffect, useState } from 'react';
import { Text, ScrollView, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../shared/config';
import { Loading } from './Loading'
import * as Animatable from 'react-native-animatable';

function RenderItem(props) {
    const item = props.item
    if (props.isLoading) {
        return (
            <Loading />
        )
    } else if (props.errMess) {
        return (
            <View>
                <Text style={{ color: '#999999' }}>{props.errMess}</Text>
            </View>
        )
    } else {
        if (item != null) {
            return (
                <Animatable.View animation="zoomIn" duration={2000}>
                    <Card>
                        <Card.FeaturedTitle style={{ color: '#333' }}>{item.name}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={{ color: '#333' }}>{item.designation}</Card.FeaturedSubtitle>
                        <Card.Image source={{ uri: baseUrl + item.image }} />
                        <Text style={{ margin: 10, color: '#999999' }}>
                            {item.description}
                        </Text>
                    </Card>
                </Animatable.View>
            )
        } else {
            return (<View></View>)
        }
    }
}
const Home = () => {

    const dishes = useSelector(state => state.dishes)
    const comments = useSelector(state => state.comments)
    const promotions = useSelector(state => state.promotions)
    const leaders = useSelector(state => state.leaders)

    const animatedValue=new Animated.Value(0)

    const xpos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200 ]
    })

    const animate=()=>{
        animatedValue.setValue(0)
        Animated.timing(
            animatedValue,
            {
                toValue:8,
                duration:8000,
                easing:Easing.linear,
                useNativeDriver:true
            }
        ).start(()=>animate())
    }
    useEffect(()=>{
        animate()
    },[dishes])
    return (
        <ScrollView>
        <View>
            {/* <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}> */}
                <RenderItem
                    item={dishes.dishes.filter(dish => dish.featured)[0]}
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                />
            {/* </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{translateX: xpos2}]}}> */}
                <RenderItem
                    item={promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={promotions.isLoading}
                    errMess={promotions.errMess}
                />
            {/* </Animated.View>
            <Animated.View style={{ width: '100%', transform: [{translateX: xpos3}]}}> */}
                <RenderItem
                    item={leaders.leaders.filter(leader => leader.featured)[0]}
                    isLoading={leaders.isLoading}
                    errMess={leaders.errMess}
                />
            {/* </Animated.View> */}
        </View>
        </ScrollView>
    );
}

export default Home;