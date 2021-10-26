import React, { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import moment from "moment";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { postFavorite } from "../../redux/ActionCreators";

const RenderDish=(props)=>{
  const dish=props.dish
  console.log(dish)
  if(dish){
    return(
      <Card>
        <Card.Title>{dish.name}</Card.Title>
        <Image style={styles.image} resizeMode="cover" source={{uri:baseUrl+dish.image}}/>
        <Text style={styles.description}>
          {dish.description}
        </Text>
        <Icon
          raised
          reverse
          name={props.favorite?'heart':'heart-o'}
          type="font-awesome"
          color='#f50'
          onPress={()=>props.favorite?console.log('Already Favorite'):props.onPress()}
        />
      </Card>
    )
  }else{
    return(<View></View>)
  }
}

function RenderComments({comments}){
  const renderCommentItem=({item,index})=>{
    return(
      <View key={index} style={{margin:10}}>
        <Text style={{fontSize:14,color:'#999999'}}>{item.comment}</Text>
        <Text style={{fontSize:12,color:'#999999'}}>{item.rating}</Text>
        <Text style={{fontSize:12,color:'#999999'}}>{'-- '+item.author+', '+moment(item.date).format('lll')}</Text>
      </View>
    )
  }
  return(
    <Card>
      <Card.Title style={{color:'#333'}}>Comments</Card.Title>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item=>item.id.toString()}
      />
    </Card>
  )
}
const DishDetail=({route})=>{
  const dishes=useSelector(state=>state.dishes.dishes)
  const comments=useSelector(state=>state.comments.comments)
  const favorites=useSelector(state=>state.favorites)
  const {dishId}=route.params

  const dispatch=useDispatch()
  const markFavorite=(dishId)=>{
    console.log(dishId)
    dispatch(postFavorite(dishId))
  }
  return(
    <ScrollView>
      <RenderDish dish={dishes[+dishId]}
        favorite={favorites.some(el=>el===dishId)}
        onPress={()=>markFavorite(dishId)}
      />
      <RenderComments comments={comments.filter((comment)=>comment.dishId===dishId)} />
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  image:{
    height:180
  },
  description:{
    margin:10,
    color:'#999999'
  }
})
export default DishDetail