import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';
import { categories } from '../util/constants';

const IncomeSummary = ({ monthlyExpenses }) => {
    const expenses = _.filter(monthlyExpenses, { method: 0 })
    const income = _.filter(monthlyExpenses, { category: categories.Income.name });
    const totalExpenses = _(expenses).map(e => Number(e.cost)).sum();
    const totalIncome = _(income).map(i => Number(i.cost)).sum();
    const net = totalIncome - totalExpenses;
    const netColor = (net >= 0) ? '#4CAF50' : '#F44336';
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Income</Text>
                <Text style={styles.value}>${totalIncome.toFixed(2)}</Text>
            </View>
            <View>
                <Text style={styles.label}>Expenses</Text>
                <Text style={styles.value}>${totalExpenses.toFixed(2)}</Text>
            </View>
            <View>
                <Text style={styles.label}>Net</Text>
                <Text style={[styles.value, { color: netColor }]}>${net.toFixed(2)}</Text>
            </View>
        </View>
    );
}

export default IncomeSummary;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        color: '#EEE',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EEE',
    },
});
