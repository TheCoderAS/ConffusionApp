import React, { useState } from "react"
import { Alert, FlatList } from "react-native"
import { Avatar, ListItem, Tile } from "react-native-elements"
import { useSelector } from "react-redux"
import { baseUrl } from "../../shared/config"
import { DISHES } from "../../shared/dishes"

const Menu =({navigation})=>{

  const dishes=useSelector(state=>state.dishes.dishes)
  
  const renderMenuItem=({item,index})=>{
    return(
      <Tile
        containerStyle={{padding:10,marginBottom:10}}
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={()=>navigation.navigate('DishDetail',{dishId:item.id})}
        imageSrc={{uri:baseUrl+item.image}}
      />
    )
  }

  return(
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={item=>item.id.toString()}
    />
  )
}

export default Menu;