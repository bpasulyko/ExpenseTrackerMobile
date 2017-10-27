import React from 'react';
import { TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import Add from '../screens/Add';
import Details from '../screens/Details';

const Tabs = TabNavigator({
    Add: {
        screen: Add,
        navigationOptions: {
            tabBarLabel: 'Add',
        },
    },
    Details: {
        screen: Details,
        navigationOptions: {
            tabBarLabel: 'Details',
        },
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: '#EEE',
        },
        style: {
            backgroundColor: '#2a2a2a',
        },
    },
});

export default Tabs;
