import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import Add from '../screens/Add';
import Details from '../screens/Details';
import Summary from '../screens/Summary';
import Settings from '../screens/Settings';

const Main = TabNavigator({
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
    Summary: {
        screen: Summary,
        navigationOptions: {
            tabBarLabel: 'Summary',
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

const Tabs = StackNavigator({
    Root: {
        screen: Main,
    },
    Settings: {
        screen: Settings,
    },
});

export default Tabs;
