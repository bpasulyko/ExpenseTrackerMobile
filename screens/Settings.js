import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView, Picker, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Settings extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: 'Settings',
            headerRight: (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => firebase.auth().signOut()}>
                    <MaterialCommunityIcons name="logout" size={30}  style={{ color: '#EEE' }} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#2a2a2a',
            },
            headerTitleStyle: {
                color: '#EEE',
            },
            headerTintColor: '#EEE',
        };
    };

    render() {
        const years = _.range(2017, 2023);
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.label}>Choose Year</Text>
                <Picker style={styles.input} mode="dropdown" selectedValue={this.props.screenProps.year} onValueChange={this.props.screenProps.handleYearChange}>
                    {years.map((year, index) => <Picker.Item key={index} label={year.toString()} value={year} />)}
                </Picker>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        padding: 20,
    },
    label: {
        color: '#EEE',
    },
    input: {
        color: '#EEE',
    },
});
