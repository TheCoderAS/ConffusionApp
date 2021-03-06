import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Loading } from './Loading'
import { baseUrl } from '../../shared/config';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable'

const History = () => {
    return (
        <Card>
            <Card.Title>Our History</Card.Title>
            <Card.Divider />
            <Text style={{ color: '#999999' }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{ color: '#999999' }}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    )
}
const LeaderShip = () => {
    //const [leaders,setLeaders]=useState([])
    const leaders = useSelector(state => state.leaders)

    if(leaders.isLoading){
        return(
            <ScrollView>
                <History/>
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Loading/>
                </Card>
            </ScrollView>
        )
    }else if(leaders.errMess){
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History/>
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Text style={{color:'#999999'}}>{leaders.errMess}</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
    else{
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Card.Divider />
                        {/* <FlatList> */}
                        {leaders.leaders.map(leader => {
                            return (
                                <ListItem key={leader.id}>
                                    <Avatar containerStyle={{ borderWidth: 2, borderColor: '#c4c4c4' }} rounded source={{ uri: baseUrl + leader.image }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{leader.name}</ListItem.Title>
                                        <ListItem.Subtitle style={{ color: '#999' }}>{leader.description}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })}
                        {/* </FlatList> */}
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}
const About = () => {

    return (
        <ScrollView>
            <LeaderShip />
        </ScrollView>
    );
}

export default About;