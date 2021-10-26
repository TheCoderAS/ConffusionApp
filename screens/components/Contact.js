import React from 'react';
import {Text,ScrollView} from 'react-native';
import { Card } from 'react-native-elements';

const Contact =()=> {

    return(
        <ScrollView>
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
        </ScrollView>
    );
}

export default Contact;