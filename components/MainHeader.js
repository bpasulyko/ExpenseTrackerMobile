import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MonthSwitcher from './MonthSwitcher';

const MainHeader = ({ month, onChange, onSettingsClick }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Expense Tracker</Text>
            <MonthSwitcher month={month} onChange={onChange}/>
            <TouchableOpacity  onPress={onSettingsClick}>
                <MaterialIcons name="settings" size={30} style={{ color: '#EEE' }}/>
            </TouchableOpacity>
        </View>
    );
};

export default MainHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        flex: 2,
        color: '#EEE',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
