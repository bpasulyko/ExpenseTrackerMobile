import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Settings extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: 'Settings',
            headerStyle: {
                backgroundColor: '#2a2a2a',
            },
            headerTitleStyle: {
                color: '#EEE',
            },
            headerTintColor: '#EEE',
        };
    };

    state = {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>SETTINGS</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
    },
});
