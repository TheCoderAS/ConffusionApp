import React from 'react';
import {Text,ScrollView, Linking, Alert} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable'

const Contact =()=> {

    const sendMail=async()=>{
        const to='192071@nith.ac.in'
        const query={
            subject:"Enquiry",
            body:"To whom it may concern.",
            cc:'aaloksah766626@gmail.com',
            bcc:'ishqbaazaalok@gmail.com'
        }
        let url=`mailto:${to}?subject=${query.subject}&body=${query.body}&cc=${query.cc}&bcc=${query.bcc}`
        return Linking.openURL(url)
    }
    return(
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider/>
                    <Text style={{color:'#999999'}}>121, Clear Water Bay Road</Text>
                    <Text style={{color:'#999999'}}>Clear Water Bay, Kowloon</Text>
                    <Text style={{color:'#999999'}}>HONG KONG</Text>
                    <Text style={{color:'#999999'}}>Tel: +852 1234 5678</Text>
                    <Text style={{color:'#999999'}}>Fax: +852 8765 4321</Text>
                    <Text style={{color:'#999999'}}>Email:confusion@food.net</Text>
                </Card>
                <Button
                    title="  Send Mail"
                    buttonStyle={{backgroundColor:'#512DA8', margin:15}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={()=>sendMail()}
                />
            </Animatable.View>
        </ScrollView>
    );
}

export default Contact;