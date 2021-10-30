import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, FlatList, Modal, Button, PanResponder, Alert, Share } from "react-native";
import moment from "moment";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { baseUrl } from "../../shared/config";
import { useDispatch, useSelector } from "react-redux";
import { postComment, postFavorite } from "../../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';

const RenderDish = (props) => {
  const dish = props.dish
  const recognizeDrag=({moveX,moveY,dx,dy})=>{
    if(dx<-50) return true;
    else return false;
  }
  const recognizeComment=({moveX,moveY,dx,dy})=>{
    if(dx>50) return true;
    else return false;
  }

  const handleViewRef=useRef()
  const panResponder=PanResponder.create({
    onStartShouldSetPanResponder:(e,gestureState)=>{
      return true;
    },
    onPanResponderEnd:(e,gestureState)=>{
      if(recognizeDrag(gestureState)){
        Alert.alert(
          'Add Favourite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
          ],
          { cancelable: false }
        )
        return true;
      }
      else if(recognizeComment(gestureState)){
        props.showCommentModal()
      }
    },
    onPanResponderGrant:()=>{
      handleViewRef.current.pulse(1000).then(endState=>console.log(endState.finished?'finished':'cancelled'))
    }
  })

  const shareDish=(title,message,url)=>{
    Share.share({
      title:title,
      message:"This is working bro."
    },{
      dialogTitle:'Share'+title
    })
  }
  if (dish) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} ref={handleViewRef}>
        <Card>
          <Card.Title>{dish.name}</Card.Title>
          <Image style={styles.image} resizeMode="cover" source={{ uri: baseUrl + dish.image }} />
          <Text style={styles.description}>
            {dish.description}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type="font-awesome"
              color='#f50'
              onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()}
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color='#512DA8'
              onPress={() => props.showCommentModal()}
            />
            <Icon
              raised
              reverse
              name='share'
              type='font-awesome'
              color='#51D2A8'
              style={styles.cardItem}
              onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
          </View>
        </Card>
      </Animatable.View>
    )
  } else {
    return (<View></View>)
  }
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14, color: '#999999' }}>{item.comment}</Text>
        <Rating imageSize={20} readonly startingValue={item.rating}/>
        <Text style={{ fontSize: 12, color: '#999999' }}>{'-- ' + item.author + ', ' + moment(item.date).format('lll')}</Text>
      </View>
    )
  }
  const data=[...comments].sort((a,b)=>{
    var d1=new Date(a.date)
    var d2=new Date(b.date)
    return d2-d1
  })
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card>
        <Card.Title style={{ color: '#333' }}>Comments</Card.Title>
        <FlatList
          data={data}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>

  )
}
const CommentModal = (props) => {
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({rating:2.5,author:'',comment:''})
  const handleChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const resetForm=()=>{
    setFormData({rating:2.5,author:'',comment:''})
  }
  const submitComment=()=>{
    dispatch(postComment(props.dishId,formData))
    resetForm()
    props.toggleModal()
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onDismiss={() => props.toggleModal()}
      onRequestClose={() => props.toggleModal()}
    >
      <View style={{padding:10}}>
        <Rating
          type="heart"
          ratingCount={5}
          imageSize={60}
          showRating
          ratingColor='#3498db'
          ratingBackgroundColor='#c8c7c8'
          fractions={1}
          startingValue={formData.rating}
          onFinishRating={(rating)=>handleChange('rating',rating)}
        />
        <Input
          placeholder="Author Name"
          leftIcon={{type:'font-awesome',name:'user'}}
          onChangeText={value=>handleChange('author',value)}
        />
        <Input
          multiline
          numberOfLines={5}
          placeholder="Your Comment"
          leftIcon={{type:'font-awesome',name:'comment'}}
          onChangeText={value=>handleChange('comment',value)}
        />
        <Button
          onPress={() => submitComment()}
          color="#512DA8"
          title="Post"
        />
        <View style={{padding:10}}></View>
        <Button
          onPress={() => props.toggleModal()}
          color="#999999"
          title="Close"
        />
      </View>
    </Modal>
  )
}
const DishDetail = ({ route }) => {
  const dishes = useSelector(state => state.dishes.dishes)
  const comments = useSelector(state => state.comments.comments)

  const favorites = useSelector(state => state.favorites)
  const [commentModal, openCommentModal] = useState(false)
  const { dishId } = route.params

  const dispatch = useDispatch()
  const markFavorite = (dishId) => {
    dispatch(postFavorite(dishId))
  }
  const toggleCommentModal = () => {
    openCommentModal(!commentModal)
  }
  return (
    <ScrollView>
      <RenderDish dish={dishes[+dishId]}
        favorite={favorites.some(el => el === dishId)}
        onPress={() => markFavorite(dishId)}
        showCommentModal={() => toggleCommentModal()}
      />
      <RenderComments comments={comments.filter((comment) => comment.dishId === dishId)} />
      <CommentModal dishId={dishId} visible={commentModal} toggleModal={() => toggleCommentModal()} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 180
  },
  description: {
    margin: 10,
    color: '#999999'
  }
})
export default DishDetail