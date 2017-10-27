import React from 'react';
import { StyleSheet, Picker } from 'react-native';
import { months } from '../util/constants';

const MonthSwitcher = ({ month, onChange }) => {
    return (
        <Picker style={styles.picker} mode="dropdown" selectedValue={month} onValueChange={onChange}>
            {months.map((name, index) => {
                return <Picker.Item key={index} label={name} value={index} />;
            })}
        </Picker>
    )
};

export default MonthSwitcher;

const styles = StyleSheet.create({
    picker: {
        color: '#EEE',
        flex: 1,
        backgroundColor: '#2a2a2a',
    },
});
