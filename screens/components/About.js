import React, { useState } from 'react';
import {Text,ScrollView, FlatList} from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../../shared/leaders';
import { baseUrl } from '../../shared/config';
import { useSelector } from 'react-redux';

const History=()=>{
    return(
            <Card>
                <Card.Title>Our History</Card.Title>
                <Card.Divider/>
                <Text style={{color:'#999999'}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text style={{color:'#999999'}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </Card>
    )
}
const LeaderShip=()=>{
    //const [leaders,setLeaders]=useState([])
    const leaders=useSelector(state=>state.leaders)
    return(
        <Card>
            <Card.Title>Corporate Leadership</Card.Title>
            <Card.Divider/>
            {/* <FlatList> */}
                {leaders.leaders.map(leader=>{
                    return(
                        <ListItem key={leader.id}>
                            <Avatar containerStyle={{borderWidth:2,borderColor:'#c4c4c4'}} rounded source={{uri:baseUrl+leader.image}}/>
                            <ListItem.Content>
                                <ListItem.Title>{leader.name}</ListItem.Title>
                                <ListItem.Subtitle style={{color:'#999'}}>{leader.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })}
            {/* </FlatList> */}
        </Card>
    )
}
const About =()=> {

    return(
        <ScrollView>
            <History/>
            <LeaderShip/>
        </ScrollView>
    );
}

export default About;