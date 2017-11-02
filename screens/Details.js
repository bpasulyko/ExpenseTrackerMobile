import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DetailsToggle from '../components/DetailsToggle';
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

    renderTable = () => {
        const expenseList = this.getExpenseList();
        return (
            <ScrollView>
                {this.renderTableHeader()}
                {expenseList.map(this.renderTableRow)}
            </ScrollView>
        );
    }

    renderTableHeader = () => {
        return (
            <View style={[styles.header, styles.row]}>
                <Text style={[styles.headerCell, styles.cell]}>Category</Text>
                <Text style={[styles.headerCell, styles.cell]}>Cost</Text>
            </View>
        );
    }

    renderTableRow = (rowData, key) => {
        const category = categories[rowData.category];
        return (
            <View key={key} style={[styles.body, styles.row]}>
                <Text style={[styles.cell, { backgroundColor: category.background, color: category.color }]}>{rowData.category}</Text>
                <Text style={[styles.cell, { textAlign: 'right' }]}>{`$${rowData.cost}`}</Text>
            </View>
        );
    }

    render() {
        const items = ['Debit', 'Credit', 'Income'];
        return (
            <View style={styles.container}>
                <DetailsToggle activeItem={this.state.activeDetailsItem} onPress={this.handleTogglePress} items={items} />
                <View style={styles.tableContainer}>
                    {this.renderTable()}
                </View>
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
    tableContainer: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    header: {
        backgroundColor: '#2a2a2a',
    },
    headerCell: {
        color: '#EEE',
    },
    body: {
        backgroundColor: '#FFF',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
