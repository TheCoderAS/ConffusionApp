import React from "react"
import { FlatList, Text } from "react-native"
import { Tile } from "react-native-elements"
import { useSelector } from "react-redux"
import { baseUrl } from "../../shared/config"
import { Loading } from "./Loading"

const Menu =({navigation})=>{

  const dishes=useSelector(state=>state.dishes)
  
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

  if(dishes.isLoading){
    return (
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
      <FlatList
        data={dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item=>item.id.toString()}
      />
    )
  }
}

export default Menu;