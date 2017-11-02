import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';
import Table from '../components/Table';
import { categories } from '../util/constants';

export default class Details extends React.Component {
    state = {
        activeDetailsItem: 'Debit',
    }

    handleTogglePress = (item) => {
        this.setState({ activeDetailsItem: item });
    }

    getExpenseList = () => {
        const monthlyExpenses = this.props.screenProps.allExpenses ? _.values(this.props.screenProps.allExpenses[this.props.screenProps.month]) : [];
        if (this.state.activeDetailsItem === 'Debit') {
            return _.filter(monthlyExpenses, { method: 0 }).reverse();
        } else if (this.state.activeDetailsItem === 'Credit') {
            return _.filter(monthlyExpenses, { method: 1 }).reverse();
        } else if (this.state.activeDetailsItem === 'Income') {
            return _.filter(monthlyExpenses, { category: categories.Income.name }).reverse();
        } else {
            return [];
        }
    }

    render() {
        const items = ['Debit', 'Credit', 'Income'];
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} items={items} />
                <Table data={this.getExpenseList().map(e => ({ label: e.category, value: Number(e.cost) }))}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'center',
    },
});
